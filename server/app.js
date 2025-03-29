import { getPatientsFromDB } from './dbConnections.js';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/patientCards/list', async (req, res) => {

    try {
        const patients = await getPatientsFromDB(req.body);
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});