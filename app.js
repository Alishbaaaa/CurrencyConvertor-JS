// CURRENCY CONVERTER
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () =>{
    updateExchangeRate();
})
for(let select of dropdowns)
{
    for (currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       if(select.name === "from" && currCode === "USD")
       {
         newOption.selected = "selected";
       }
       else if(select.name === "to" && currCode === "INR")
       {
         newOption.selected = "selected";
       }
       select.append(newOption);
    }

    select.addEventListener("change",(evt) =>{
        // evt target is select - to or from )
        updateFlag(evt.target)
    })

}

const updateFlag = (element) => {
    // element is from  basically 
     console.log(element);
    //  if i choose SZL - that the value i choose in from
     let currCode = element.value;
     console.log(currCode);
    //  and then SZ is the country code
     let countryCode = countryList[currCode];
     console.log(countryCode);
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
     img.src = newSrc;
}

// exchange rate button
const btn = document.querySelector("form button");
// evt has info about click 
btn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    updateExchangeRate();
    
});

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amVal = amount.value;
    console.log(amVal);
    if(amVal === "" || amVal < 1)
    {
       amVal = 1;
       amount.value = "1";
    }

    // will get exchange rate from this URL
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // old rate = json[toCurrency]
    // rate = json[fromCurrency][toCurrency]
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amVal * rate;
    console.log(finalAmount);
    msg.innerText = `${amVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
};
