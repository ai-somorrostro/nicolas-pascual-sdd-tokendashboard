(() => {
  const statusElement = document.querySelector("#data-status");
  const summaryGrid = document.querySelector("#summary-grid");
  const compactFormatter = new Intl.NumberFormat("es-ES", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const requiredStringFields = ["name", "inputModality", "outputModality"];
  const requiredNumberFields = [
    "inputPricePerToken",
    "outputPricePerToken",
    "ttft_ms",
    "inputTokensDay",
    "outputTokensDay",
    "inputTokensWeek",
    "outputTokensWeek",
  ];

  function showStatus(message, state) {
    summaryGrid.hidden = true;
    summaryGrid.replaceChildren();
    statusElement.hidden = false;
    statusElement.dataset.state = state;
    statusElement.textContent = message;
  }

  function isValidRecord(record) {
    return (
      record &&
      typeof record === "object" &&
      requiredStringFields.every((field) => typeof record[field] === "string" && record[field].trim()) &&
      requiredNumberFields.every((field) => Number.isFinite(record[field]) && record[field] >= 0)
    );
  }

  function summarizeModels(models) {
    return models.reduce(
      (summary, model) => ({
        modelCount: summary.modelCount + 1,
        dailyTokens: summary.dailyTokens + model.inputTokensDay + model.outputTokensDay,
        weeklyTokens: summary.weeklyTokens + model.inputTokensWeek + model.outputTokensWeek,
        fastestTtft: Math.min(summary.fastestTtft, model.ttft_ms),
      }),
      { modelCount: 0, dailyTokens: 0, weeklyTokens: 0, fastestTtft: Number.POSITIVE_INFINITY },
    );
  }

  function createMetricCard(label, value, detail) {
    const article = document.createElement("article");
    article.className = "metric-card";

    for (const [className, text] of [
      ["metric-label", label],
      ["metric-value", value],
      ["metric-detail", detail],
    ]) {
      const element = document.createElement("p");
      element.className = className;
      element.textContent = text;
      article.append(element);
    }

    return article;
  }

  function renderSummary(models) {
    const summary = summarizeModels(models);
    const cards = [
      createMetricCard("Modelos disponibles", String(summary.modelCount), "Registros cargados"),
      createMetricCard("Tokens diarios", compactFormatter.format(summary.dailyTokens), "Entrada y salida combinadas"),
      createMetricCard("Tokens semanales", compactFormatter.format(summary.weeklyTokens), "Entrada y salida combinadas"),
      createMetricCard("TTFT mas rapido", `${summary.fastestTtft} ms`, "Tiempo hasta el primer token"),
    ];

    summaryGrid.replaceChildren(...cards);
    statusElement.hidden = true;
    delete statusElement.dataset.state;
    summaryGrid.hidden = false;
  }

  async function loadDashboard() {
    showStatus("Cargando datos de los modelos...", "loading");

    try {
      const response = await fetch("mock-data.json", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("No se ha podido recuperar la fuente de datos.");
      }

      const models = await response.json();
      if (!Array.isArray(models) || models.length === 0 || !models.every(isValidRecord)) {
        throw new Error("El archivo de datos no tiene el formato esperado.");
      }

      renderSummary(models);
    } catch (error) {
      const message =
        location.protocol === "file:"
          ? "Abre el dashboard desde un servidor HTTP local para cargar los datos."
          : error instanceof SyntaxError
            ? "El archivo de datos no contiene JSON valido."
            : error instanceof Error
              ? error.message
              : "No se han podido cargar los datos.";
      showStatus(message, "error");
    }
  }

  loadDashboard();
})();
