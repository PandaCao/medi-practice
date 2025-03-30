export function isValidBirthNumber(birthNumber) {
    const regex = /^\d{6}\/\d{3,4}$/;
    return regex.test(birthNumber);
}