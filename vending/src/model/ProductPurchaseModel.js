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

    retCoin = () => {

    }

}