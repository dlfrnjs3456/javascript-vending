import {pageMove} from "./index.js"

export function saveTable(tableName) {
    const table = document.getElementById(tableName);
    let tableData = [];

    for (let i = 1; i < table.rows.length; i++) {  
        let rowData = [];
        for (let cell of table.rows[i].cells) {
            if (cell.cellIndex !== 3){
                rowData.push(cell.innerHTML);
            }
        }
        tableData.push(rowData);
    }

    localStorage.setItem("item-tree", JSON.stringify(tableData));
}

export function loadTable() {
    const table = document.getElementById("product-manage-table");
    let tableData = JSON.parse(localStorage.getItem("item-tree"));

    table.innerHTML = table.rows[0].outerHTML;
    if (tableData) {
        for (let rowData of tableData) {
            let newRow = table.insertRow();
            for (let cellData of rowData) {
                let newCell = newRow.insertCell();
                newCell.innerHTML = cellData;
            }
        }
    }
}

export function display() { 
    const table = document.getElementById("product-manage-table");

    const newRow = table.insertRow();

    const rowCol1 = newRow.insertCell(0);
    const rowCol2 = newRow.insertCell(1);
    const rowCol3 = newRow.insertCell(2);
    
    rowCol1.innerText = window.localStorage.getItem("product-name");
    rowCol2.innerText = window.localStorage.getItem("product-price");
    rowCol3.innerText = window.localStorage.getItem("product-quantity");

    saveTable("product-manage-table");
}

function initEventListeners() {
    document.getElementById("product-add-button").addEventListener("click", (event) => {
        event.preventDefault();
        
        const productName = document.getElementById("product-name-input").value;
        const productPrice = document.getElementById("product-price-input").value;
        const productQuantity = document.getElementById("product-quantity-input").value;

        if (productName && productPrice && productQuantity) {
            if(Number(productPrice) < 100) {
                alert("상품 가격은 100원 이상이어야 합니다!");
                return;
            }
            if(Number(productPrice) % 10 !== 0) {
                alert("상품 가격은 10원 단위로 입력해주세요!");
                return;
            }
            window.localStorage.setItem("product-name", productName);
            window.localStorage.setItem("product-price", productPrice);
            window.localStorage.setItem("product-quantity", productQuantity);

            display();
        } else {
            alert("모든 입력값을 채워주세요!");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadTable();
    initEventListeners();
});

pageMove();