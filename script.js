//let api = `https://open.er-api.com/v6/latest/USD`

let api = `https://v6.exchangerate-api.com/v6/9189bbdd60eed8749f331d14/latest/USD`;

const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");





//Create dropdown from the currencies array
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  option.img=currency;
  fromDropDown.add(option);
});

//Repeat same thing for the other dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

//Setting default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

let convertCurrency = () => {
  //Create References
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  //If amount input field is not empty
  if (amount.length != 0 & amount>0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        
        let toExchangeRate = data.conversion_rates[toCurrency];

        // console.log("From ExchangeRate" , fromExchangeRate);
        // console.log("TO Exchange rate" , toExchangeRate);
        // console.log(fromCurrency);

        // fromCu.innerHTML = `${fromCurrency}`;

        let convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        multiPlied.innerHTML = `${convertedAmount.toFixed(2)}`
        // let valueOfCurrency = 
        dataFromApi.innerHTML = `  ${(convertedAmount/amount).toFixed(2)}`;
        currencyRate.innerHTML = `${fromCurrency}/INR Google rate`
        //console.log("1 usd :",convertedAmount/amount);
        let finalTaxedAmount = (convertedAmount*1.5)/100;
        TaxedAmt.innerHTML = `${finalTaxedAmount.toFixed(2)}`
       // console.log("Taxed Amount",finalTaxedAmount);
        const ffinalAmt = convertedAmount-finalTaxedAmount;
       // console.log("Final amount",ffinalAmt);
        result.innerHTML = `${ffinalAmt.toFixed(
          2
        )} ${toCurrency}`;
      });
  } else {
    alert("Please fill in the valid amount");
  }
};

document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);

// document.addEventListener('DOMContentLoaded', () => {
//   createDropdownOptions();
//   convertCurrency();
// });
