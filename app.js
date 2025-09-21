import express from 'express';
import cookieParser from 'cookie-parser';
import lectorRouter from './routes/lectorRouter.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Endpoint público de verificación
app.get('/ping', (req, res) => {
  res.json({ mensaje: '🟢 Contenedor activo y accesible sin autenticación' });
});

// Rutas biométricas protegidas
app.use('/', lectorRouter);

export default app;
