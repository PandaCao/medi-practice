import { api } from './api';

// Mock data storage
let mockExaminations = [
    {
        id: '1',
        patient_id: '32372797-6d90-49a8-ba48-677497b3b587',
        doctor_id: 'fb28cef4-02a5-4573-8a4c-d0eb21f0e6b1',
        anamnesis: 'Pacient si stěžuje na bolesti hlavy',
        diagnosis_overview: 'Migréna',
        medication: 'Ibuprofen 400mg',
        lab_results: 'Vše v normě',
        objective_findings: 'Žádné zvláštní nálezy',
        conclusions: 'Pravděpodobně migréna',
        recommendations: 'Užívat léky při bolestech',
        prescribed_medication: 'Ibuprofen 400mg',
        new_diagnosis: '',
        place: 'MediPractise',
        stamp: 'xxx',
        doctors_signature: 'xxx',
    },
    {
        id: '2',
        patient_id: '32372797-6d90-49a8-ba48-677497b3b587',
        doctor_id: 'fb28cef4-02a5-4573-8a4c-d0eb21f0e6b1',
        anamnesis: 'Kontrolní vyšetření',
        diagnosis_overview: 'Stav se zlepšil',
        medication: 'Ibuprofen 400mg',
        lab_results: 'Vše v normě',
        objective_findings: 'Žádné zvláštní nálezy',
        conclusions: 'Pacient se cítí lépe',
        recommendations: 'Pokračovat v léčbě',
        prescribed_medication: 'Ibuprofen 400mg',
        new_diagnosis: '',
        place: 'MediPractise',
        stamp: 'xxx',
        doctors_signature: 'xxx',
    },
];

class ExaminationApi {
    async addExamination(examinationData) {
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            const newExamination = {
                ...examinationData,
                id: Date.now().toString(), // Generate unique ID
            };

            mockExaminations.push(newExamination);
            return newExamination;
        } catch (error) {
            console.error('Error adding examination:', error);
            throw error;
        }
    }

    async updateExamination(examinationData) {
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            const index = mockExaminations.findIndex(
                (e) => e.id === examinationData.id,
            );
            if (index === -1) {
                throw new Error('Examination not found');
            }

            mockExaminations[index] = {
                ...mockExaminations[index],
                ...examinationData,
            };

            return mockExaminations[index];
        } catch (error) {
            console.error('Error updating examination:', error);
            throw error;
        }
    }

    async getPatientExaminations(patientId) {
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            return mockExaminations.filter((e) => e.patient_id === patientId);
        } catch (error) {
            console.error('Error fetching patient examinations:', error);
            throw error;
        }
    }

    async getExaminationDetail(examinationId) {
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            const examination = mockExaminations.find(
                (e) => e.id === examinationId,
            );
            if (!examination) {
                throw new Error('Examination not found');
            }

            return examination;
        } catch (error) {
            console.error('Error fetching examination detail:', error);
            throw error;
        }
    }

    async deleteExamination(examinationId) {
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            const index = mockExaminations.findIndex(
                (e) => e.id === examinationId,
            );
            if (index === -1) {
                throw new Error('Examination not found');
            }

            mockExaminations = mockExaminations.filter(
                (e) => e.id !== examinationId,
            );
            return { success: true };
        } catch (error) {
            console.error('Error deleting examination:', error);
            throw error;
        }
    }
}

export const examinationApi = new ExaminationApi();
