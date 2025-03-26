import { createBtn } from '../model/Utils/createBtn.js'
import { pageMove } from '../model/Utils/pageMove.js'

export default class VendingMachineManageView {
    constructor() {
        this.chargeInput = document.querySelector("#charge-input");
        this.chargeBtn = document.querySelector("#charge-button");
        this.inputCharge = document.querySelector("#input-charge");
        this.productPurchaseTbl = document.querySelector("#product-purchase-item");
        this.coinRetBtn = document.querySelector("#coin-return-button");
        this.initialize(); //구매 버튼이 활성화 된 후에 dom에서 가져와야 하기 때문에 먼저 테이블 불러오기 
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
    //기존 상품 관리에서 저장한 테이블 불러오기
    loadTable = () => {
        let tableData = JSON.parse(localStorage.getItem("item-tree")) || [];
        this.productPurchaseTbl.innerHTML = this.productPurchaseTbl.rows[0].outerHTML;
        let disableFlag = false;
        tableData.forEach(rowData => {
            let newRow = this.productPurchaseTbl.insertRow();
            ["productName", "productPrice", "productQuantity"].forEach((key, i) => { //dataset 형태로 가져오기 
                let cell = newRow.insertCell();
                cell.dataset[key] = rowData[i];
                cell.textContent = rowData[i];
                disableFlag = key === "productQuantity" ? Number(rowData[i]) === 0 ? true : false : false; //개수가 0일 경우 버튼 비활성화 지정 
            });
            let btn = createBtn("구매하기", "purchase-button", "class");
            btn.disabled = disableFlag;
            let buttonCell = newRow.insertCell();
            buttonCell.appendChild(btn);
        });
    }

    renderTable = (retCoinList, inputCharge) => {
        this.updateInputCharge(inputCharge);
        this.updateRetCoinTable(retCoinList);
    }

    updateRetCoinTable = (RetcoinList) => {
        [10,50,100,500].forEach(val => {
        document.getElementById(`coin-${val}-quantity`).textContent = RetcoinList[val].count + "개";
    });
    }

}