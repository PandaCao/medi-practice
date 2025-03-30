import { addPatientCard, getPatientsFromDB } from './dbConnections.js';
import express from 'express';
import { isValidBirthNumber } from './utils.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/v1/patientCards/add', async (req, res) => {
    const body = req.body;

    const required = ['first_name', 'last_name', 'date_of_birth', 'birth_number', 'insurance_id', 'sex'];
    for (const field of required) {
        if (!body[field]) {
            return res.status(400).json({ error: `${field} is required.` });
        }
    }

    if (!isValidBirthNumber(body.birth_number)) {
        return res.status(400).json({ error: 'Invalid birth number format. Use xxxxxx/xxxx or xxxxxxx/xxx' });
    }

    try {
        const newPatient = await addPatientCard(body);
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get('/api/v1/patientCards/list', async (req, res) => {

    try {
        const patients = await getPatientsFromDB(req.body);
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});