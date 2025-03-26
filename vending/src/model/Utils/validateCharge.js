export function validateCharge(charge) {
    return charge % 10 === 0 && Number.isInteger(charge) && charge >= 100;
}