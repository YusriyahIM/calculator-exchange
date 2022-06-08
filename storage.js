const CACHE_KEY = "exchange_history";

const checkForStorage = () => {
  return typeof Storage !== "undefined";
};

const putHistory = (data) => {
  if (checkForStorage()) {
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    historyData.unshift(data);

    if (historyData.length > 5) {
      historyData.pop();
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
};

const showHistory = () => {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
};

const renderHistory = () => {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${history.toShowNama}</td>`;
    row.innerHTML += `<td>${history.toShowResult}</td>`;
    row.innerHTML += `<td>${history.toShowBeamasuk}</td>`;
    row.innerHTML += `<td>${history.toShowPpn}</td>`;
    row.innerHTML += `<td>${history.toShowPph}</td>`;
    row.innerHTML += `<td>${history.toShowBerat}</td>`;
    row.innerHTML += `<td>${history.toShowTotal}</td>`;

    historyList.appendChild(row);
  }
};

renderHistory();
