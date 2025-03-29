import React from 'react';
import AddPatient from '../components/patients/AddPatient';

function AddPatientPage() {
    const handleSaveDraft = (formData) => {
        console.log('Saving draft:', formData);
        // Implementace ukládání konceptu
    };

    const handleSubmit = (formData) => {
        console.log('Submitting form:', formData);
        // Implementace odeslání formuláře
    };

    const handleDelete = () => {
        console.log('Deleting form');
        // Implementace smazání formuláře
    };

    return (
        <AddPatient
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
        />
    );
}

export default AddPatientPage;
