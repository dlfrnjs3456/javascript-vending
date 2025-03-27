export default class ProductPurcaseModel {
    //반환해줄 코인
    #retCoinList
    //현재 가지고 있는 코인
    #coinList

    constructor() {
        this.retCoinList = {
            10: { count: 0 },
            50: { count: 0 },
            100: { count: 0 },
            500: { count: 0 }
        }
    }
    getInputCharge = () => {
        return Number(localStorage.getItem("input-charge"));
    }

    setRetCoinList = (retCoinList) => {
        localStorage.setItem("retCoinList", JSON.stringify(retCoinList));
    }

    setCoinList = (coinList) => {
        localStorage.setItem("coinList", JSON.stringify(coinList));
    }

    setInputCharge = (inputCharge) => {
        localStorage.setItem("input-charge", inputCharge);
    }

    getCoinList = () => {
        return JSON.parse(localStorage.getItem("coinList"));
    }

    getRetCoinList = () => {
        return JSON.parse(localStorage.getItem("retCoinList"));
    }

    //버튼 누른 열의 상품 가격 가져오기
    getProductPrice = (row) => {
        return Number(row.children[1].dataset.productPrice);
    }

    //버튼 누른 열의 상품 개수 가져오기
    getProductQuantity = (row) => {
        return Number(row.children[2].dataset.productQuantity);
    }

    setProductQuantity = (row, productQuantity) => {
        row.children[2].dataset.productQuantity = productQuantity;
    }

    initRetCoinList = () => {
        return this.retCoinList;
    }

    retCoin = (currentCharge, coinList, retCoinList) => {
        [500, 100, 50, 10].forEach(val => {
            while (currentCharge - val >= 0 && coinList[val].count !== 0) { //자판기 현금이 떨어질 때 까지 반환
                currentCharge -= val;
                coinList[val].count--;
                retCoinList[val].count++;
            }
        });
        this.setInputCharge(currentCharge);
        this.setCoinList(coinList);
        this.setRetCoinList(retCoinList); //최신 상태로 업데이트
    }
}