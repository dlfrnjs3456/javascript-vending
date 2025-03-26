export default class ProductAddModel {

    validateProductQuantity(quantity){
        return Number.isInteger(quantity) && quantity >= 0;
    }

    //기존 객체에 상품 추가
    saveProductInfo(productName, productPrice, productQuantity) { 
        localStorage.setItem("product-manage-name", productName);
        localStorage.setItem("product-manage-price", productPrice);
        localStorage.setItem("product-manage-quantity", productQuantity);
    }
}