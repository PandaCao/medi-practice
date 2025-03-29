export const validateForm = (data) => {
    let errors = {};

    if (!data.firstName.trim()) {
        errors.firstName = 'Jméno je povinné';
    }
    if (!data.lastName.trim()) {
        errors.lastName = 'Přijmení je povinné';
    }
    return errors;
};
