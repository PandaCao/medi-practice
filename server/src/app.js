import express from 'express';
import patientRoutes from './routes/patientCardRoutes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000', // Allow requests from local development
    'https://medipractise-server.onrender.com',
];

// Enable CORS with dynamic origin
app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }),
);

app.use(express.json());
app.use('/api/v1/patientCards', patientRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
