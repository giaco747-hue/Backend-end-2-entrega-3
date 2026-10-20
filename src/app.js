import express from 'express';
import eventsRouter from './routes/events.routes.js';
import sessionsRouter from './routes/sessions.routes.js';

const app = express();

// Middlewares para procesar JSON en las peticiones HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint de prueba de servidor (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Servidor activo"
  });
});

// Definición de las rutas base del proyecto
app.use('/api/events', eventsRouter);
app.use('/api/sessions', sessionsRouter);

export default app;