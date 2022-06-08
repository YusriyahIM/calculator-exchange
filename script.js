var kurs = {
  USD: { IDR: 14465.79754, CNY: 6.67087, SGD: 1.37452 },
  CNY: { IDR: 2168.50239, USD: 0.149905, SGD: 0.206048 },
  SGD: { IDR: 10524.25395, CNY: 4.853236, USD: 0.727527 },
  IDR: { CNY: 0.000461, SGD: 9.5e-5, USD: 6.9e-5 },
};
// Input Form
var btn = document.querySelector(".calculate-btn");
var baseCurrencyInput = document.getElementById("currency-1");
let secondCurrencyInput = document.getElementById("currency-2");
var amountInput = document.getElementById("amount");
var quantityInput = document.getElementById("quantity");
var namaInput = document.getElementById("nama-produk");
var beratInput = document.getElementById("berat-produk");

// Show Form
var toShowNama = document.querySelector(".given-name");
var toShowBase = document.querySelector(".base-currency");
var toShowSecond = document.querySelector(".second-currency");
var toShowResult = document.querySelector(".final-result");
var toShowBerat = document.querySelector(".output-kilograms");
var toShowBeamasuk = document.querySelector(".bea-masuk");
var toShowPpn = document.querySelector(".show-ppn");
var toShowPph = document.querySelector(".show-pph");
var toShowTotal = document.querySelector(".show-total");

// Fungsi
function allFunction(event) {
  event.preventDefault();
  var nama = namaInput.value;
  var amount = amountInput.value;
  var quantity = quantityInput.value;
  var from = baseCurrencyInput.value;
  var to = secondCurrencyInput.value;
  var berat = beratInput.value * 200;

  var result = 0;
  try {
    if (from == to) {
      result = amount;
    } else {
      result = quantity * amount * kurs[from][to];
    }
  } catch (err) {
    result = quantity * amount * (1 / kurs[to][from]);
  }
  var beamasuk = result * 0.075;
  var ppn = result * 0.11;
  var pph = result * 0.1;
  var alltotal = result + beamasuk + ppn + pph + berat;

  //   Show to page
  toShowBase.textContent = quantity;
  toShowSecond.textContent = "Rp";

  toShowResult.textContent = "Rp " + parseFloat(result.toFixed(0)).toLocaleString();
  toShowBerat.textContent = "Rp " + berat.toLocaleString("en");
  toShowNama.textContent = nama;
  toShowBeamasuk.textContent = "Rp " + parseFloat(beamasuk.toFixed(0)).toLocaleString();
  toShowPpn.textContent = "Rp " + parseFloat(ppn.toFixed(0)).toLocaleString();
  toShowPph.textContent = "Rp " + parseFloat(pph.toFixed(0)).toLocaleString();
  toShowTotal.textContent = "Rp " + parseFloat(alltotal.toFixed(0)).toLocaleString();

  const history = {
    toShowNama: nama,
    toShowResult: parseFloat(result.toFixed(0)).toLocaleString(),
    toShowBeamasuk: parseFloat(beamasuk.toFixed(0)).toLocaleString(),
    toShowPpn: parseFloat(ppn.toFixed(0)).toLocaleString(),
    toShowPph: parseFloat(pph.toFixed(0)).toLocaleString(),
    toShowBerat: berat.toLocaleString("en"),
    toShowTotal: parseFloat(alltotal.toFixed(0)).toLocaleString(),
  };

  putHistory(history);
  renderHistory();
}

btn.addEventListener("click", allFunction);
