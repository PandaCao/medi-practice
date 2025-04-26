import express from 'express';
import patientRoutes from './routes/patientCardRoutes.js';
import examinationRecordRoutes from './routes/examinationRecordRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import cors from 'cors';
import winston from 'winston'
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import listEndpoints from 'express-list-endpoints';

const app = express();
const port = process.env.PORT || 5000;
export const log = winston.createLogger({
    transports: [new winston.transports.Console()]
});

app.use(
    cors({
        origin: ['http://localhost:3000', 'https://medipractise.onrender.com'],
    }),
);

app.use(express.json());
app.use('/api/v1/patientCards', patientRoutes);
app.use('/api/v1/examinationRecords', examinationRecordRoutes);
app.use('/api/v1/reservation', reservationRoutes);
app.use('/api/v1/prescription', prescriptionRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(listEndpoints(app));
});