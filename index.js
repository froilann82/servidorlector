import app from './app.js';

const PUERTO = 3001;

app.listen(PUERTO, '0.0.0.0', () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🟢 Servicio iniciado en puerto ${PUERTO}`);
});
