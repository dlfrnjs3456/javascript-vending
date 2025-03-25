import { pageMove } from "./index.js"

function calCharge(coinList, currentCharge, chargeUnit) {
    if (chargeUnit > currentCharge) {
        return currentCharge;
    }
    coinList[chargeUnit].count++;
    currentCharge = currentCharge - chargeUnit;

    return currentCharge;
}

function divideCharge() {
    let currentCharge = window.localStorage.getItem("current-charge");
    let coinList = JSON.parse(localStorage.getItem("coinList"));
    if (coinList === null) {
        coinList = {
            10: { count: 0 },
            50: { count: 0 },
            100: { count: 0 },
            500: { count: 0 }
        };
    }

    while (currentCharge > 0) {
        currentCharge = calCharge(coinList, currentCharge, MissionUtils.Random.pickNumberInList([10, 50, 100, 500]));
    }

    localStorage.setItem("coinList", JSON.stringify(coinList));
}

function display() {
    const coinList = JSON.parse(localStorage.getItem("coinList"));
    let currentCharge = localStorage.getItem("current-charge");
    if(currentCharge === null) { 
        currentCharge = 0;
    }
    let coinSum = 0;
    if (coinList !== null) {
        [10, 50, 100, 500].forEach((val, index) => {
            if(coinList[val].count !== 0) { 
                coinSum += (val * coinList[val].count);
            }
            document.getElementById(`vending-machine-coin-${val}-quantity`).innerText = coinList[val].count + "개";
        });
    }

    if(coinSum !== currentCharge) { 
        currentCharge = coinSum;
    }
    document.getElementById("current-charge").innerText = currentCharge + "원";
    window.localStorage.setItem("current-charge", currentCharge);
}

function initEventListeners() {
    document.getElementById("vending-machine-charge-button").addEventListener("click", (event) => {
        event.preventDefault();
        debugger
        const prevCharge = window.localStorage.getItem("current-charge");
        let saveCharge = Number(document.getElementById("vending-machine-charge-input").value);
        if (prevCharge !== null) {
            saveCharge += Number(prevCharge);
        }
        window.localStorage.setItem("current-charge", saveCharge);
        divideCharge();
        display();
    });
}

pageMove();
display();
initEventListeners();