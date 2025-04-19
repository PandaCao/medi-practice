import express from 'express';
import patientRoutes from './routes/patientCardRoutes.js';
import examinationRecordRoutes from './routes/examinationRecordRoutes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(
    cors({
        origin: ['http://localhost:3000', 'https://medipractise.onrender.com'],
    }),
);

app.use(express.json());
app.use('/api/v1/patientCards', patientRoutes);
app.use('/api/v1/examinationRecords', examinationRecordRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
