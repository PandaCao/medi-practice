export function isValidBirthNumber(birthNumber) {
    const regex = /^\d{6}\/\d{4}$/;
    return regex.test(birthNumber);
}

export function isOnlyLetters(name) {
    const trimmedName = String(name).trim()
    const regex = /^[A-Za-zÁ-žá-ž]+$/;
    return regex.test(trimmedName);
}

export function isValidPhoneNumber(phoneNumber) {
    const regex = /^\+?\d{9,13}$/;
    return regex.test(phoneNumber);
}

export function isPositiveNumber(num) {
    const regex = /^(?:\d+|\d*\.\d+)$/;
    return regex.test(num) && parseFloat(num) > 0;
}

export function isValidPostCode(postCode) {
    const postCodeBS = String(postCode).replace(" ","");
    const regex = /^\d{5}$/;
    return regex.test(postCodeBS);
}

export function checkDates(start_date, end_date){
    return start_date < end_date;
}

export function getTrimmedBody(body) {
    for (let key in body) {
        if (typeof body[key] === 'string') {
            body[key] = body[key].trim();
        }
    }
    return body;
}