import ProductAddModel from '../model/ProductAddModel.js'
import ProductAddView from '../view/ProductAddView.js'
import {validateCharge} from '../model/Utils/validateCharge.js'

export default class ProductAddController {
    constructor(model, view) { 
        this.model = model;
        this.view = view;
    }

    initialize() { 
        this.view.bindProductAddBtn(this.handleProductAddBtn.bind(this));
    }

    //추가하기 버튼으로 객체에 추가 및 테이블 추가
    handleProductAddBtn(event) { 
        event.preventDefault();
        const productName = this.view.getProductName();
        const productPrice = this.view.getProductPrice();
        const productQuantity = this.view.getProductQuantity();

        if(!validateCharge(productPrice)) {
            alert("상품의 가격은 100원 이상이며 10원 단위로 나눠 떨어져야합니다!");
            return;
        }

        if(!this.model.validateProductQuantity(productQuantity)) {
            alert("상품의 수량은 0 이상의 정수로 입력해주세요!");
            return;
        }
        this.model.saveProductInfo(productName, productPrice, productQuantity);
        //메뉴 추가 화면 구성
        this.view.updateProductTable();
    }

}
const productAddModel = new ProductAddModel();
const productAddView = new ProductAddView();
const productAddController = new ProductAddController(productAddModel, productAddView);
productAddController.initialize();
