export const INSURANCE_COMPANIES = {
    111: 'Všeobecná zdravotní pojišťovna',
    201: 'Vojenská zdravotní pojišťovna',
    205: 'Česká průmyslová zdravotní pojišťovna',
    207: 'Oborová zdravotní pojišťovna',
    209: 'Zaměstnanecká pojišťovna Škoda',
    211: 'Zdravotní pojišťovna ministerstva vnitra',
    213: 'RBP, zdravotní pojišťovna',
};

// Helper funkce pro získání celého názvu pojišťovny podle ID
export const getInsuranceCompanyName = (id) => {
    return INSURANCE_COMPANIES[id] ? `${id} - ${INSURANCE_COMPANIES[id]}` : id;
};

// Seznam pojišťoven pro select box
export const INSURANCE_COMPANIES_LIST = Object.entries(INSURANCE_COMPANIES).map(
    ([code, name]) => ({
        code,
        name: `${code} - ${name}`,
    }),
);
