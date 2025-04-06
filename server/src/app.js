import express from 'express';
import patientRoutes from './routes/patientCardRoutes.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use('/api/v1/patientCards', patientRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
