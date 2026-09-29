(() => {
  const statusElement = document.querySelector("#data-status");
  const summaryGrid = document.querySelector("#summary-grid");
  const tokenListStatus = document.querySelector("#token-list-status");
  const tokenListCount = document.querySelector("#token-list-count");
  const tokenSearch = document.querySelector("#token-search");
  const comparisonStatus = document.querySelector("#comparison-status");
  const compareSelected = document.querySelector("#compare-selected");
  const tokenTableContainer = document.querySelector("#token-table-container");
  const tokenTableBody = document.querySelector("#token-table-body");
  const tokenDetail = document.querySelector("#token-detail");
  const tokenDetailBackdrop = document.querySelector("#token-detail-backdrop");
  const tokenDetailTitle = document.querySelector("#token-detail-title");
  const priceChart = document.querySelector("#price-chart");
  const priceChartSummary = document.querySelector("#price-chart-summary");
  const tokenDetailList = document.querySelector("#token-detail-list");
  const closeTokenDetail = document.querySelector("#close-token-detail");
  let detailOpener = null;
  let detailModel = null;
  let activeChartNames = new Set();
  let activeChartIsComparison = false;
  let selectedModelNames = new Set();
  let loadedModels = [];
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

  function normalizeSearchValue(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("es-ES")
      .trim();
  }

  function filterModels(models, query) {
    const normalizedQuery = normalizeSearchValue(query);

    if (!normalizedQuery) {
      return models;
    }

    return models.filter((model) =>
      [model.name, model.inputModality, model.outputModality].some((field) =>
        normalizeSearchValue(field).includes(normalizedQuery),
      ),
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

  function updateComparisonControls() {
    const selectedCount = selectedModelNames.size;
    comparisonStatus.textContent = selectedCount === 0
      ? "Selecciona modelos para compararlos."
      : `${selectedCount} ${selectedCount === 1 ? "modelo seleccionado" : "modelos seleccionados"}.`;
    compareSelected.disabled = selectedCount < 2;
  }

  function toggleModelSelection(model, selected) {
    if (selected) {
      selectedModelNames.add(model.name);
    } else {
      selectedModelNames.delete(model.name);
    }
    updateComparisonControls();
  }

  function createChartMetric(label, value, className, maxValue) {
    const metric = document.createElement("div");
    metric.className = "chart-metric";

    const header = document.createElement("div");
    header.className = "chart-metric-header";
    const metricLabel = document.createElement("span");
    metricLabel.textContent = label;
    const metricValue = document.createElement("strong");
    metricValue.textContent = priceFormatter.format(value);
    header.append(metricLabel, metricValue);

    const track = document.createElement("div");
    track.className = "chart-bar-track";
    const bar = document.createElement("div");
    bar.className = `chart-bar ${className}`;
    bar.style.width = `${Math.max(4, (value / maxValue) * 100)}%`;
    bar.setAttribute("aria-hidden", "true");
    track.append(bar);
    metric.append(header, track);

    return metric;
  }

  function renderPriceChart(models, isComparison) {
    const maxValue = Math.max(
      ...models.flatMap((model) => [model.inputPricePerToken, model.outputPricePerToken]),
      Number.MIN_VALUE,
    );
    const chartModels = models.map((model) => {
      const article = document.createElement("article");
      article.className = "chart-model";
      const heading = document.createElement("h3");
      heading.textContent = model.name;
      article.append(
        heading,
        createChartMetric("Precio de entrada", model.inputPricePerToken, "input", maxValue),
        createChartMetric("Precio de salida", model.outputPricePerToken, "output", maxValue),
      );
      return article;
    });

    priceChart.replaceChildren(...chartModels);
    priceChart.setAttribute(
      "aria-label",
      `${isComparison ? "Comparativa de precios de" : "Precios de"} ${models.map((model) => model.name).join(", ")}`,
    );
    priceChartSummary.textContent = isComparison
      ? `Comparativa de ${models.length} modelos. La escala comun toma como referencia el precio maximo seleccionado.`
      : "Las barras muestran el precio de entrada y el precio de salida del modelo seleccionado.";
  }

  function renderChartDetails(models, isComparison) {
    if (isComparison) {
      const term = document.createElement("dt");
      term.textContent = "Modelos comparados";
      const description = document.createElement("dd");
      description.textContent = models.map((model) => model.name).join(", ");
      tokenDetailList.replaceChildren(term, description);
      return;
    }

    const [model] = models;
    const fields = [
      ["Modalidad de entrada", model.inputModality],
      ["Modalidad de salida", model.outputModality],
      ["TTFT", `${model.ttft_ms} ms`],
      ["Tokens diarios", compactFormatter.format(model.inputTokensDay + model.outputTokensDay)],
    ];
    tokenDetailList.replaceChildren(...fields.flatMap(([label, value]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = value;
      return [term, description];
    }));
  }

  function openPriceChart(models, opener, isComparison = false) {
    activeChartNames = new Set(models.map((model) => model.name));
    activeChartIsComparison = isComparison;
    detailModel = isComparison ? null : models[0];
    detailOpener = opener;
    tokenDetailTitle.textContent = isComparison ? "Comparativa de precios" : models[0].name;
    renderPriceChart(models, isComparison);
    renderChartDetails(models, isComparison);
    tokenDetail.hidden = false;
    tokenDetailBackdrop.hidden = false;
    document.body.classList.add("drawer-open");
    tokenDetail.focus();
  }

  function renderTokenList(models, query = "") {
    tokenTableBody.replaceChildren();
    const visibleNames = new Set(models.map((model) => model.name));
    selectedModelNames = new Set([...selectedModelNames].filter((name) => visibleNames.has(name)));
    updateComparisonControls();

    if (models.length === 0) {
      tokenTableContainer.hidden = true;
      tokenListCount.textContent = "0 modelos";
      tokenListCount.hidden = false;
      tokenListStatus.hidden = false;
      tokenListStatus.dataset.state = "empty";
      tokenListStatus.textContent = query.trim()
        ? `No se encontraron modelos para "${query.trim()}".`
        : "No hay modelos disponibles para mostrar.";
      return;
    }

    const rows = models.map((model) => {
      const row = document.createElement("tr");
      row.className = "token-row";
      row.tabIndex = 0;
      row.setAttribute("aria-label", `Mostrar grafico de ${model.name}`);

      const selectionCell = document.createElement("td");
      selectionCell.className = "selection-cell";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = selectedModelNames.has(model.name);
      checkbox.setAttribute("aria-label", `Seleccionar ${model.name} para comparar`);
      checkbox.addEventListener("click", (event) => event.stopPropagation());
      checkbox.addEventListener("change", () => toggleModelSelection(model, checkbox.checked));
      selectionCell.append(checkbox);
      row.append(selectionCell);

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

      row.addEventListener("click", () => openPriceChart([model], row));
      row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPriceChart([model], row);
        }
      });

      return row;
    });

    tokenTableBody.append(...rows);
    tokenListStatus.hidden = true;
    delete tokenListStatus.dataset.state;
    tokenListCount.textContent = `${models.length} modelos`;
    tokenListCount.hidden = false;
    tokenTableContainer.hidden = false;
  }

  function closeDetail() {
    tokenDetail.hidden = true;
    tokenDetailBackdrop.hidden = true;
    document.body.classList.remove("drawer-open");
    if (detailOpener?.isConnected) {
      detailOpener.focus();
    } else {
      tokenSearch.focus();
    }
    detailModel = null;
    detailOpener = null;
    activeChartNames = new Set();
    activeChartIsComparison = false;
  }

  closeTokenDetail.addEventListener("click", closeDetail);
  tokenDetailBackdrop.addEventListener("click", closeDetail);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !tokenDetail.hidden) {
      closeDetail();
    }
  });

  compareSelected.addEventListener("click", () => {
    const selectedModels = loadedModels.filter((model) => selectedModelNames.has(model.name));
    if (selectedModels.length >= 2) {
      openPriceChart(selectedModels, compareSelected, true);
    }
  });

  function updateTokenList() {
    const query = tokenSearch.value;
    const filteredModels = filterModels(loadedModels, query);

    if (activeChartIsComparison) {
      const visibleChartModels = filteredModels.filter((model) => activeChartNames.has(model.name));
      if (visibleChartModels.length >= 2) {
        renderPriceChart(visibleChartModels, true);
        renderChartDetails(visibleChartModels, true);
        activeChartNames = new Set(visibleChartModels.map((model) => model.name));
      } else if (tokenDetail.hidden === false) {
        closeDetail();
      }
    } else if (detailModel && !filteredModels.includes(detailModel)) {
      closeDetail();
    }

    renderTokenList(filteredModels, query);
  }

  tokenSearch.addEventListener("input", updateTokenList);

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

      loadedModels = models;
      tokenSearch.disabled = false;
      renderSummary(models);
      updateTokenList();
    } catch (error) {
      tokenSearch.disabled = true;
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
