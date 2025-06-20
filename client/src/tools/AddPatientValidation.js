// Pomocné validační funkce
const isLettersOnly = (text) =>
    /^[a-záčďéěíňóřšťúůýžA-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s]+$/.test(text);

const isValidEmail = (email) => {
    if (!email) return true; // Email není povinný
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone) => {
    if (!phone) return true; // Telefon není povinný
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('420')) {
        return /^420\d{9}$/.test(cleanPhone);
    }
    return /^\d{9}$/.test(cleanPhone);
};

const isValidHeight = (height) => {
    if (!height) return true; // Výška není povinná
    return /^\d{2,3}$/.test(height);
};

const isValidWeight = (weight) => {
    if (!weight) return true; // Váha není povinná
    return /^\d{2,3}$/.test(weight);
};

// Upravit validaci rodného čísla - nyní kontrolujeme jen formát
const isValidPersonalId = (personalId) => {
    if (!personalId) return false;

    // Formát RRMMDD/XXXX nebo RRMMDDXXXX
    const regex = /^\d{6}[/]?\d{3,4}$/;
    return regex.test(personalId);
};

const isValidInsuranceCompany = (code) => {
    const validCodes = ['111', '201', '205', '207', '209', '211', '213'];
    return validCodes.includes(code);
};

const isValidRegistrationDate = (date) => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();

    // Nastavíme čas na půlnoc pro obě data, aby se porovnávaly pouze datumy
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate <= today;
};

export const validateForm = (data) => {
    let errors = {};

    // Jméno - povinné, pouze písmena, 1-50 znaků
    if (!data.firstName) {
        errors.firstName = 'Jméno je povinné';
    } else if (!isLettersOnly(data.firstName)) {
        errors.firstName = 'Jméno může obsahovat pouze písmena';
    } else if (data.firstName.length > 50) {
        errors.firstName = 'Jméno může mít maximálně 50 znaků';
    }

    // Příjmení - povinné, pouze písmena, 1-50 znaků
    if (!data.lastName) {
        errors.lastName = 'Příjmení je povinné';
    } else if (!isLettersOnly(data.lastName)) {
        errors.lastName = 'Příjmení může obsahovat pouze písmena';
    } else if (data.lastName.length > 50) {
        errors.lastName = 'Příjmení může mít maximálně 50 znaků';
    }

    // Datum narození - povinné, nesmí být v budoucnosti
    if (!data.birthDate) {
        errors.birthDate = 'Datum narození je povinné';
    } else {
        const birthDate = new Date(data.birthDate);
        const today = new Date();
        if (birthDate > today) {
            errors.birthDate = 'Datum narození nemůže být v budoucnosti';
        }
    }

    // Rodné číslo - povinné, formát XXXXXX/XXX(X)
    if (!data.personalId) {
        errors.personalId = 'Rodné číslo je povinné';
    } else if (!isValidPersonalId(data.personalId)) {
        errors.personalId = 'Neplatné rodné číslo';
    }

    // Pohlaví - povinné
    if (!data.gender) {
        errors.gender = 'Pohlaví je povinné';
    }

    // Zdravotní pojišťovna - povinné, dle číselníku
    if (!data.insuranceCompany) {
        errors.insuranceCompany = 'Zdravotní pojišťovna je povinná';
    } else if (!isValidInsuranceCompany(data.insuranceCompany)) {
        errors.insuranceCompany = 'Neplatný kód pojišťovny';
    }

    // Datum registrace - povinné, nesmí být v budoucnosti
    if (!data.registrationDate) {
        errors.registrationDate = 'Datum registrace je povinné';
    } else if (!isValidRegistrationDate(data.registrationDate)) {
        errors.registrationDate =
            'Datum registrace nemůže být v budoucnosti (zadejte dnešní nebo dřívější datum)';
    }

    // Výška - nepovinné, 2-3 číslice
    if (data.height && !isValidHeight(data.height)) {
        errors.height = 'Výška musí být 2-3 místné číslo';
    }

    // Váha - nepovinné, 2-3 číslice
    if (data.weight && !isValidWeight(data.weight)) {
        errors.weight = 'Váha musí být 2-3 místné číslo';
    }

    // Kontaktní osoba - nepovinné, max 100 znaků
    if (data.contactPersonName && data.contactPersonName.length > 100) {
        errors.contactPersonName =
            'Jméno kontaktní osoby může mít maximálně 100 znaků';
    }

    // Telefon kontaktní osoby - nepovinné, validní telefon
    if (data.contactPersonPhone && !isValidPhone(data.contactPersonPhone)) {
        errors.contactPersonPhone = 'Neplatný formát telefonu kontaktní osoby';
    }

    // Email - nepovinné, validní email
    if (data.email && !isValidEmail(data.email)) {
        errors.email = 'Neplatný formát emailu';
    }

    // Textové pole - nepovinné, max 500 znaků
    if (data.diagnosisOverview && data.diagnosisOverview.length > 500) {
        errors.diagnosisOverview =
            'Přehled diagnóz může mít maximálně 500 znaků';
    }

    if (data.anamnesis && data.anamnesis.length > 500) {
        errors.anamnesis = 'Anamnéza může mít maximálně 500 znaků';
    }

    if (data.medication && data.medication.length > 500) {
        errors.medication = 'Seznam léků může mít maximálně 500 znaků';
    }

    return errors;
};
