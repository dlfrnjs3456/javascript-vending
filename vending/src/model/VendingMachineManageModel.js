export default class VendingMachineModel {
    #coinList
    constructor() {
        this.coinList = {
            10: { count: 0 },
            50: { count: 0 },
            100: { count: 0 },
            500: { count: 0 }
        };
    }

    validateCharge = (charge) => {
        return charge % 10 === 0 && Number.isInteger(charge) && charge >= 100;
    }

    getPrevCharge = () => {
        return localStorage.getItem("current-charge") || 0;
    }

    setCurrentCharge = (currentCharge) => {
        localStorage.setItem("current-charge", currentCharge);
    }

    calCharge = (currentCharge, chargeUnit) => {
        if (chargeUnit > currentCharge) {
            return currentCharge;
        }
        this.coinList[chargeUnit].count++;
        currentCharge = currentCharge - chargeUnit;

        return currentCharge;
    }

    retCoinList = () => {
        return JSON.parse(localStorage.getItem("coinList")) || {
            10: { count: 0 },
            50: { count: 0 },
            100: { count: 0 },
            500: { count: 0 }
        };
    }

    divideCharge = (inputCharge) => {
        this.coinList = this.retCoinList();

        while (inputCharge > 0) {
            inputCharge = this.calCharge(inputCharge, MissionUtils.Random.pickNumberInList([10, 50, 100, 500]));
        }

        localStorage.setItem("coinList", JSON.stringify(this.coinList));
    }

    updateCoinCharge = () => {
        this.coinList = JSON.parse(localStorage.getItem("coinList"));
        let currentCharge = Number(localStorage.getItem("current-charge")) || 0;
        let coinSum = 0;
        if (this.coinList !== null) {
            [10, 50, 100, 500].forEach((val, index) => {
                if (this.coinList[val].count !== 0) {
                    coinSum += (val * this.coinList[val].count);
                }
            });
        }
        if (coinSum !== currentCharge) {
            currentCharge = coinSum;
            window.localStorage.setItem("current-charge", currentCharge);
        }
    }

    seperateCoin = (inputCharge) => {
        this.divideCharge(inputCharge);
        this.updateCoinCharge();
    }
}