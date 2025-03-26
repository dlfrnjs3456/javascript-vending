import {pageMove} from '../model/Utils/pageMove.js'
import { saveTable } from '../model/Utils/saveTable.js';

export default class ProductAddView {
    constructor() { 
        this.productNameInput = document.querySelector("#product-name-input");
        this.productPriceInput = document.querySelector("#product-price-input");
        this.productQuantityInput = document.querySelector("#product-quantity-input");
        this.productAddBtn = document.querySelector("#product-add-button");
        this.productTbl = document.querySelector(".product-manage-item");
        this.prodcutNameCol = document.querySelector(".product-manage-name");
        this.productPriceCol = document.querySelector(".product-manage-price");
        this.productQuantityCol = document.querySelector(".product-manage-quantity")
        this.initialize();
        pageMove();
    }

    initialize = () => {
        this.loadTable();
    }

    getProductName = () => {
        return this.productNameInput.value;
    }

    getProductPrice = () => {
        return Number(this.productPriceInput.value);
    }

    getProductQuantity = () => {
        return Number(this.productQuantityInput.value);
    }

    bindProductAddBtn = (handler) => {
        this.productAddBtn.addEventListener("click", handler);
    }

    updateProductTable = () => {
       const newRow = this.productTbl.insertRow();

       const productArr = ["product-manage-name", "product-manage-price", "product-manage-quantity"];
       for(let i=0; i<3; i++) {
        newRow.insertCell(i).textContent = localStorage.getItem(productArr[i]);
       }
       
       saveTable(this.productTbl);
    }

    loadTable = () => { 
        let tableData = JSON.parse(localStorage.getItem("item-tree"));
    
        this.productTbl.innerHTML = this.productTbl.rows[0].outerHTML;
        if (tableData) {
            for (let rowData of tableData) {
                let newRow = this.productTbl.insertRow();
                for (let cellData of rowData) {
                    let newCell = newRow.insertCell();
                    newCell.innerHTML = cellData;
                }
            }
        }
    }
}