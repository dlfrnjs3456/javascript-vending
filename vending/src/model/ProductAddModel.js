export default class ProductAddModel {


    validateProductPrice(price){ 
        return Number.isInteger(price) && price % 10 === 0 && price >= 100;
    }

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