import express from 'express';
import cookieParser from 'cookie-parser';
import lectorRouter from './routes/lectorRouter.js';

const app = express();

// Middlewares institucionales
app.use(express.json());
app.use(cookieParser());

// Rutas biométricas
app.use('/', lectorRouter);

export default app;
