import ProductPurchaseView from '../view/ProductPurchaseView.js'
import ProductPurcaseModel from '../model/ProductPurchaseModel.js'
import { validateCharge } from '../model/Utils/validateCharge.js'
import { saveTable } from '../model/Utils/saveTable.js'

export default class ProductPurchaseController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    initialize = () => {
        this.view.bindChargeBtn(this.handleChargeBtn.bind(this));
        this.view.bindPurchaseBtn(this.handlePurchaseBtn.bind(this));
        this.view.bindCoinRetBtn(this.handleCoinRetBtn.bind(this));
        this.view.renderTable(this.model.getRetCoinList(), this.model.getInputCharge()); //테이블 화면 업데이트
    }

    handleChargeBtn = (event) => {
        event.preventDefault();
        const prevCharge = this.model.getInputCharge() || 0; //미리 투입한 금액
        let inputCharge = this.view.getChargInput(); //지금 투입한 금액
        if (!validateCharge(inputCharge)) {
            alert("금액은 100원 이상 10으로 나누어 떨어져야 합니다!");
            return;
        }
        this.model.setInputCharge(inputCharge + prevCharge);
        this.view.updateInputCharge(inputCharge + prevCharge);
    }

    handlePurchaseBtn = (event) => {
        event.preventDefault();
        const row = event.target.closest("tr"); //버튼을 누른 열 선택택
        const productPrice = this.model.getProductPrice(row); //상품 가격 가져오기
        const productQuantity = this.model.getProductQuantity(row); //상품 개수 가져오기
        let currentCharge = this.model.getInputCharge(); //현재 자금 가져오기
        if (currentCharge >= productPrice && productQuantity !== 0) { //현재 가진돈이 상품 가격보다 많거나 같고 개수가 0보다 크면 구매 가능
            this.model.setInputCharge(currentCharge - productPrice);
            this.view.updateInputCharge(currentCharge - productPrice);//금액에서 상품 가격만큼 마이너스로 업데이트
            this.model.setProductQuantity(row, productQuantity - 1);
            this.view.updateProductQuantity(row, productQuantity - 1); //개수 하나씩 하락
            if(this.model.getProductQuantity(row) === 0) {
                this.view.disablePurchaseBtn(row); //개수가 0개가 되면 버튼 비활성화
            }
            saveTable(this.view.getItemTbl());
        } else {
            return alert("금액이 부족합니다!");
        }
    }

    handleCoinRetBtn = (event) => {
        event.preventDefault();
        let retCoinList = this.model.initRetCoinList(); // 반환 동전 테이블 초기화
        let coinList = this.model.getCoinList(); // 기존에 잔돈 만들었던 테이블 가져오기
        if (!coinList) {
            return alert("반환해줄 동전이 없습니다");
        }
        let currentCharge = this.model.getInputCharge(); //현재 자판기에 투입한 현금

        [500, 100, 50, 10].forEach(val => {
            while (currentCharge - val >= 0 && coinList[val].count !== 0) { //자판기 현금이 떨어질 때 까지 반환
                currentCharge -= val;
                coinList[val].count--;
                retCoinList[val].count++;
            }
        });
        this.model.setInputCharge(currentCharge);
        this.model.setCoinList(coinList);
        this.model.setRetCoinList(retCoinList); //최신 상태로 업데이트
        this.view.renderTable(this.model.getRetCoinList(), this.model.getInputCharge()); //업데이트된 화면으로 렌더링
    }
}

const productPurcaseModel = new ProductPurcaseModel();
const productPurcaseView = new ProductPurchaseView();
const productPurchaseController = new ProductPurchaseController(productPurcaseModel, productPurcaseView);
productPurchaseController.initialize();