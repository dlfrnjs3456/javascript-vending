import { pageMove } from "./index.js"
import { saveTable } from "./product-manager.js";

function loadTable() {
    const table = document.getElementById("product-purchase-item");
    let tableData = JSON.parse(localStorage.getItem("item-tree"));

    table.innerHTML = table.rows[0].outerHTML;

    if (tableData) {
        for (let rowData of tableData) {
            let newRow = table.insertRow();

            let nameCell = newRow.insertCell();
            let priceCell = newRow.insertCell();
            let quantityCell = newRow.insertCell();
            let buttonCell = newRow.insertCell();


            nameCell.dataset.productName = rowData[0];
            priceCell.dataset.productPrice = rowData[1];
            quantityCell.dataset.productQuantity = rowData[2];

            nameCell.innerText = rowData[0];
            priceCell.innerText = rowData[1];
            quantityCell.innerText = rowData[2];

            const btn = document.createElement("button");
            btn.setAttribute("class", "purchase-button");
            btn.innerText = "구매하기";


            buttonCell.appendChild(btn);
        }
    }
}
function display() {
    let currentCharge = localStorage.getItem("input-charge");
    if(currentCharge === null) { 
        currentCharge = 0;
    }
    document.getElementById("input-charge").innerText = currentCharge + "원";
    const retCoinList = JSON.parse(localStorage.getItem("retCoinList"));
    if (retCoinList !== null) {
        [10, 50, 100, 500].forEach((val, index) => {
            document.getElementById(`coin-${val}-quantity`).textContent = retCoinList[val].count + "개";
        });
    }
}

function returnCoin() { 
    let coinList = JSON.parse(localStorage.getItem("coinList"));
    if(coinList === null ) { 
        alert("반환해줄 동전이 없습니다");
        return;
    }
    let retCoinList = {
            10 : {count : 0},
            50 : {count :0},
            100 : {count : 0},
            500 : {count : 0}
        };
    let currentCharge = localStorage.getItem("input-charge");

    [500,100,50,10].forEach((val,index) => {
        while(currentCharge - val >= 0 && coinList[val].count !== 0) { 
            currentCharge -= val;
            coinList[val].count--;
            retCoinList[val].count++;
        }
    });

    localStorage.setItem("input-charge", currentCharge);
    localStorage.setItem("coinList", JSON.stringify(coinList));
    localStorage.setItem("retCoinList", JSON.stringify(retCoinList));
}

function initEventListeners() {
    document.getElementById("charge-button").addEventListener("click", (event) => {
        event.preventDefault();
        debugger
        const prevCharge = window.localStorage.getItem("input-charge");
        let saveCharge = Number(document.getElementById("charge-input").value);
        if (prevCharge !== null) {
            saveCharge += Number(prevCharge);
        }
        window.localStorage.setItem("input-charge", saveCharge);
        display();
    });

    document.querySelectorAll(".purchase-button").forEach(button => {
        button.addEventListener("click", function (event) {
            const row = event.target.closest("tr");
            let currentCharge = Number(window.localStorage.getItem("input-charge"));
            const productPrice = Number(row.children[1].dataset.productPrice);
            const productQuantity = Number(row.children[2].dataset.productQuantity);
            if (currentCharge >= productPrice && productQuantity !== 0) {
                currentCharge -= productPrice;
                window.localStorage.setItem("input-charge", currentCharge);
                row.children[2].dataset.productQuantity = productQuantity - 1;
                row.children[2].textContent = productQuantity - 1;
                display();
                saveTable("product-purchase-item");
            }
            else { 
                alert("구매할 수 없습니다!");
                return;
            }
        });
    });
    
    document.getElementById("coin-return-button").addEventListener("click", (event) => {
        event.preventDefault();
        returnCoin();
        display();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadTable();
    initEventListeners();
});

pageMove();
display();
