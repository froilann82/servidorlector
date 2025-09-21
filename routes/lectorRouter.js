import { Router } from 'express';
import { execFile } from 'child_process';

const router = Router();
const rutaEjecutable = 'C:\\Program Files\\Software Navarro\\LectorHuellas\\LectorHuellas.exe';

router.post('/abrir-registro-huella', (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ mensaje: 'Token de autenticación no encontrado en la cookie' });
    }

    const args = ['0', token];
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 🔔 Registro biométrico solicitado con token`);

    execFile(rutaEjecutable, args, (error) => {
      if (error) {
        console.error(`[${timestamp}] ❌ Error al ejecutar lector:`, error);
        return res.status(500).json({ mensaje: 'Error al iniciar lector', detalles: error.message });
      }

      console.log(`[${timestamp}] 🟢 Lector de huellas iniciado correctamente con ID=0`);
      res.json({ mensaje: 'Software de registro de huellas iniciado correctamente' });
    });

  } catch (err) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ❌ Error inesperado al ejecutar el lector:`, err);
    res.status(500).json({ mensaje: 'Error interno', detalles: err.message });
  }
});

router.post('/abrir-huella', (req, res) => {
  const { id } = req.body;
  const token = req.cookies.token;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] 🔔 Solicitud para abrir lector recibida con ID: '${id}'`);

  if (!id || typeof id !== 'string' || id.trim() === '') {
    console.warn(`[${timestamp}] ⚠️ ID inválido recibido: '${id}'`);
    return res.status(400).json({ mensaje: 'ID inválido para apertura de captura biométrica' });
  }

  if (!token) {
    console.warn(`[${timestamp}] ⚠️ Token de autenticación no encontrado en la cookie`);
    return res.status(401).json({ mensaje: 'Token de autenticación no encontrado en la cookie' });
  }

  console.log(`[${timestamp}] 🚀 Ejecutando '${rutaEjecutable}' con argumentos: '${id}', '${token}'`);

  execFile(rutaEjecutable, [id, token], (error, stdout, stderr) => {
    if (error) {
      console.error(`[${timestamp}] ❌ Fallo al ejecutar lector:`, error);
      if (error.code === 'ENOENT') {
        return res.status(500).json({
          mensaje: 'El software biométrico no fue encontrado.',
          detalles: `Ruta: ${rutaEjecutable}`
        });
      }
      return res.status(500).json({
        mensaje: 'Error al iniciar el lector biométrico.',
        detalles: error.message
      });
    }

    console.log(`[${timestamp}] ✅ Lector biométrico abierto correctamente para ID: ${id}`);
    res.json({ mensaje: `✅ Lector biométrico abierto correctamente con ID ${id}` });
  });
});

router.get('/ping', (req, res) => {
  res.json({ mensaje: '🟢 Contenedor activo y escuchando' });
});

export default router;
