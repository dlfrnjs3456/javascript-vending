import { createBtn } from '../model/Utils/createBtn.js'
import { pageMove } from '../model/Utils/pageMove.js'

export default class VendingMachineManageView {
    constructor() {
        this.chargeInput = document.querySelector("#charge-input");
        this.chargeBtn = document.querySelector("#charge-button");
        this.inputCharge = document.querySelector("#input-charge");
        this.productPurchaseTbl = document.querySelector("#product-purchase-item");
        this.coinRetBtn = document.querySelector("#coin-return-button");
        this.initialize();
        this.purchaseBtn = document.querySelectorAll(".purchase-button");
        pageMove();
    }

    initialize = () => {
        this.loadTable();
    }

    getChargInput = () => {
        return Number(this.chargeInput.value);
    }

    updateInputCharge = (charge) => {
        this.inputCharge.textContent = charge + "원";
    }

    bindChargeBtn = (handle) => {
        this.chargeBtn.addEventListener("click", handle);
    }

    bindCoinRetBtn = (handle) => {
        this.coinRetBtn.addEventListener("click", handle);
    }

    bindPurchaseBtn = (handle) => {
        this.purchaseBtn.forEach(button => {
            button.addEventListener("click", handle);
        });
    }

    getItemTbl = () => {
        return this.productPurchaseTbl;
    }

    //구매하기 버튼 비활성화
    disablePurchaseBtn = (row) => {
        const button = row.children[3].querySelector(".purchase-button");
        button.disabled = true;
    }

    updateProductQuantity = (row, quantity) => {
        row.children[2].textContent = quantity;
    }

    loadTable = () => {
        let tableData = JSON.parse(localStorage.getItem("item-tree")) || [];
        this.productPurchaseTbl.innerHTML = this.productPurchaseTbl.rows[0].outerHTML;
        let disableFlag = false;
        tableData.forEach(rowData => {
            let newRow = this.productPurchaseTbl.insertRow();
            ["productName", "productPrice", "productQuantity"].forEach((key, i) => {
                let cell = newRow.insertCell();
                cell.dataset[key] = rowData[i];
                cell.textContent = rowData[i];
                disableFlag = key === "productQuantity" ? Number(rowData[i]) === 0 ? true : false : false;
            });
            let btn = createBtn("구매하기", "purchase-button", "class");
            btn.disabled = disableFlag;
            let buttonCell = newRow.insertCell();
            buttonCell.appendChild(btn);
        });
    }

}