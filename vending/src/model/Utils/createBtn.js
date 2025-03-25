export function createBtn(btnText, btnId) {
    const productAddBtn = document.createElement("button");
    const btnTextNode = document.createTextNode(btnText);
    productAddBtn.setAttribute("id", btnId);
    productAddBtn.appendChild(btnTextNode);
    return productAddBtn;
}