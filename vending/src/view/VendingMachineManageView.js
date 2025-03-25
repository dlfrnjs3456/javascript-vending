import {pageMove} from '../model/Utils/pageMove.js'

export default class VendingMachineManageView {
    constructor() { 
        this.vendingMachineChargeInput = document.querySelector("#vending-machine-charge-input");
        this.vendingMachineChargeBtn = document.querySelector("#vending-machine-charge-button");
        this.vendingMachineChargeAmount = document.querySelector("#vending-machine-charge-amount");
        pageMove();
    }

    getChargeInput = () => {
        return Number(this.vendingMachineChargeInput.value);
    }

    updateCharge = (currentCharge) => {
        this.vendingMachineChargeAmount.textContent = currentCharge +"원";
    }

    bindVendingMachineChargeBtn = (handler) => {
        this.vendingMachineChargeBtn.addEventListener("click", handler);
    }

    updateCoinTable = (coinList) => {
        [10,50,100,500].forEach((val,index) => {
        document.getElementById(`vending-machine-coin-${val}-quantity`).textContent = coinList[val].count + "개";
    });
    }

}