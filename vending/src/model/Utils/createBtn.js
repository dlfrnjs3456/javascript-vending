export function createBtn(btnText, btnId, idSort) {
    const productAddBtn = document.createElement("button");
    const btnTextNode = document.createTextNode(btnText);
    productAddBtn.setAttribute(idSort, btnId);
    productAddBtn.appendChild(btnTextNode);
    return productAddBtn;
}