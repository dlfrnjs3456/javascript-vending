export function pageMove() { 
    document.getElementById("product-add-menu").addEventListener("click", (event) => {
        event.preventDefault();
        location.href="../pages/product-add.html";
    });

    document.getElementById("vending-machine-manage-menu").addEventListener("click", (event) => {
        event.preventDefault();
        location.href="../pages/vending-machine-manage.html";
    });

    document.getElementById("product-purchase-menu").addEventListener("click", (event) => {
        event.preventDefault();
        location.href="../pages/product-purchase.html";
    });
}