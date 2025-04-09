import express from 'express';
import patientRoutes from './routes/patientCardRoutes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(
    cors({
        origin: '*', // Allow all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }),
);

app.use(express.json());
app.use('/api/v1/patientCards', patientRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
