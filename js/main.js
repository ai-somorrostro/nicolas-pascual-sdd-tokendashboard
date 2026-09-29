(() => {
  const statusElement = document.querySelector("#data-status");
  const summaryGrid = document.querySelector("#summary-grid");
  const tokenListStatus = document.querySelector("#token-list-status");
  const tokenListCount = document.querySelector("#token-list-count");
  const tokenTableContainer = document.querySelector("#token-table-container");
  const tokenTableBody = document.querySelector("#token-table-body");
  const tokenDetail = document.querySelector("#token-detail");
  const tokenDetailTitle = document.querySelector("#token-detail-title");
  const tokenDetailList = document.querySelector("#token-detail-list");
  const closeTokenDetail = document.querySelector("#close-token-detail");
  let detailOpener = null;
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
  const priceFormatter = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 8,
    maximumFractionDigits: 8,
  });

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

  function renderTokenList(models) {
    tokenTableBody.replaceChildren();

    if (models.length === 0) {
      tokenTableContainer.hidden = true;
      tokenListCount.hidden = true;
      tokenListStatus.hidden = false;
      tokenListStatus.dataset.state = "empty";
      tokenListStatus.textContent = "No hay modelos disponibles para mostrar.";
      return;
    }

    const rows = models.map((model) => {
      const row = document.createElement("tr");
      const values = [
        model.name,
        model.inputModality,
        model.outputModality,
        priceFormatter.format(model.inputPricePerToken),
        priceFormatter.format(model.outputPricePerToken),
        `${model.ttft_ms} ms`,
        compactFormatter.format(model.inputTokensDay + model.outputTokensDay),
      ];

      for (const value of values) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
      }

      const actionCell = document.createElement("td");
      const detailButton = document.createElement("button");
      detailButton.className = "detail-button";
      detailButton.type = "button";
      detailButton.textContent = "Ver detalle";
      detailButton.addEventListener("click", () => openTokenDetail(model, detailButton));
      actionCell.append(detailButton);
      row.append(actionCell);

      return row;
    });

    tokenTableBody.append(...rows);
    tokenListStatus.hidden = true;
    delete tokenListStatus.dataset.state;
    tokenListCount.textContent = `${models.length} modelos`;
    tokenListCount.hidden = false;
    tokenTableContainer.hidden = false;
  }

  function openTokenDetail(model, opener) {
    const fields = [
      ["Modalidad de entrada", model.inputModality],
      ["Modalidad de salida", model.outputModality],
      ["Precio de entrada", priceFormatter.format(model.inputPricePerToken)],
      ["Precio de salida", priceFormatter.format(model.outputPricePerToken)],
      ["TTFT", `${model.ttft_ms} ms`],
      ["Tokens diarios", compactFormatter.format(model.inputTokensDay + model.outputTokensDay)],
      ["Tokens semanales", compactFormatter.format(model.inputTokensWeek + model.outputTokensWeek)],
    ];

    tokenDetailTitle.textContent = model.name;
    tokenDetailList.replaceChildren(...fields.flatMap(([label, value]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = value;
      return [term, description];
    }));
    detailOpener = opener;
    tokenDetail.hidden = false;
    tokenDetail.focus();
  }

  function closeDetail() {
    tokenDetail.hidden = true;
    detailOpener?.focus();
  }

  closeTokenDetail.addEventListener("click", closeDetail);

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
      renderTokenList(models);
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
