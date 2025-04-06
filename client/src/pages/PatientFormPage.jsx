//speciální stránka určená pro úpravu údajů o konkrétním pacientovi
import { useParams, useNavigate } from 'react-router-dom';
import { patients as allPatients } from '../data/patients';
import AddPatient from '../components/patients/AddPatient';
import { ROUTES } from '../config/routes';

const PatientFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const patient = allPatients.find((p) => String(p.id) === id);

    if (!patient) {
        return <div>Pacient nenalezen.</div>;
    }

    // Rozdělíme jméno na křestní a příjmení
    const [lastName, firstName] = patient.name.split(' ');

    // Převedeme datum registrace z formátu DD/MM/YYYY na YYYY-MM-DD
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    // Najdeme kód pojišťovny podle názvu
    const getInsuranceCode = (insuranceName) => {
        const insuranceMap = {
            'Všeobecná zdravotní pojišťovna': '111',
            'Vojenská zdravotní pojišťovna': '201',
            'Česká průmyslová zdravotní pojišťovna': '205',
            'Oborová zdravotní pojišťovna': '207',
            'Zaměstnanecká pojišťovna Škoda': '209',
            'Zdravotní pojišťovna ministerstva vnitra': '211',
            'RBP, zdravotní pojišťovna': '213',
        };
        return insuranceMap[insuranceName] || '';
    };

    // Připravíme data pro formulář
    const formData = {
        firstName: firstName || '',
        lastName: lastName || '',
        personalId: patient.personalId || '',
        birthDate: patient.birthDate || '',
        gender: patient.gender || '',
        insuranceCompany: getInsuranceCode(patient.insurance) || '',
        registrationDate: formatDate(patient.registrationDate),
        height: patient.height || '',
        weight: patient.weight || '',
        contactPerson: patient.contactPerson || '',
        email: patient.email || '',
        phone: patient.phone || '',
        diagnosisOverview: patient.diagnosisOverview || '',
        anamnesis: patient.anamnesis || '',
        medication: patient.medication || '',
    };

    const handleSubmit = (data) => {
        // Najdeme index pacienta v poli
        const patientIndex = allPatients.findIndex((p) => String(p.id) === id);
        if (patientIndex !== -1) {
            // Aktualizujeme data pacienta
            allPatients[patientIndex] = {
                ...allPatients[patientIndex],
                name: `${data.lastName} ${data.firstName}`,
                personalId: data.personalId,
                birthDate: data.birthDate,
                gender: data.gender,
                insurance: data.insuranceCompany,
                registrationDate: data.registrationDate,
                height: data.height,
                weight: data.weight,
                contactPerson: data.contactPerson,
                email: data.email,
                phone: data.phone,
                diagnosisOverview: data.diagnosisOverview,
                anamnesis: data.anamnesis,
                medication: data.medication,
            };
            // Přesměrujeme na detail pacienta
            navigate(ROUTES.PATIENT_DETAIL.replace(':id', id));
        }
    };

    const handleDelete = () => {
        // Najdeme index pacienta v poli
        const patientIndex = allPatients.findIndex((p) => String(p.id) === id);
        if (patientIndex !== -1) {
            // Odstraníme pacienta z pole
            allPatients.splice(patientIndex, 1);
            // Přesměrujeme na seznam pacientů
            navigate(ROUTES.PATIENTS);
        }
    };

    return (
        <div>
            <AddPatient
                initialData={formData}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default PatientFormPage;
