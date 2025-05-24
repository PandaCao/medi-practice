// Pomocná funkce pro extrakci datumu narození a pohlaví z rodného čísla
export const parsePersonalId = (personalId) => {
    if (!personalId) return null;

    // Odstraníme lomítko pokud existuje
    const cleanId = personalId.replace(/\D/g, '');

    if (cleanId.length < 9 || cleanId.length > 10) return null;

    // Rozdělení rodného čísla
    const yearPart = cleanId.substr(0, 2);
    const monthPart = parseInt(cleanId.substr(2, 2));
    const dayPart = parseInt(cleanId.substr(4, 2));

    // Určení pohlaví a oprava měsíce
    let gender = 'male';
    let month = monthPart;

    if (monthPart > 12) {
        gender = 'female';
        month = monthPart - 50;
    }

    // Určení roku
    let year = parseInt(yearPart) + 1900;
    if (year < 1954) year += 100; // Pro rodná čísla po roce 2000

    // Validace data
    const date = new Date(year, month - 1, dayPart);
    if (isNaN(date.getTime())) return null;

    return {
        birthDate: `${year}-${String(month).padStart(2, '0')}-${String(
            dayPart,
        ).padStart(2, '0')}`,
        gender,
    };
};
