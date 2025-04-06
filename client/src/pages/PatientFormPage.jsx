//speciální stránka určená pro úpravu údajů o konkrétním pacientovi
import { useParams } from 'react-router-dom';
import { patients as allPatients } from '../data/patients';
import AddPatient from '../components/patients/AddPatient'; // ✅ správná cesta

const PatientFormPage = () => {
    const { id } = useParams();
    const patient = allPatients.find((p) => String(p.id) === id);

    if (!patient) {
        return <div>Pacient nenalezen.</div>;
    }

    const handleSubmit = (data) => {
        console.log('Uloženo:', data);
    };

    const handleDelete = () => {
        console.log('Smazán pacient s ID:', id);
    };

    return (
        <div className="container mt-4">
            <h2>Karta pacienta</h2>
            <AddPatient
                initialData={patient}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default PatientFormPage;
