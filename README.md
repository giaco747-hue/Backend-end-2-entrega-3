# 🎟️ Plataforma de Eventos e Inscripciones - Pre-entrega 1

## 📌 Descripción del Proyecto
Este proyecto constituye la base arquitectónica inicial para una API REST profesional dedicada a la gestión de eventos, usuarios, inscripciones y tickets. Ha sido diseñado utilizando una **arquitectura por capas (Layered Architecture)** en Node.js y Express, garantizando una alta escalabilidad, mantenibilidad y modularidad para las siguientes entregas.

---

## 🛠️ Tecnologías Utilizadas
- **Entorno de ejecución:** Node.js
- **Framework Web:** Express.js
- **Variables de Entorno:** dotenv
- **Módulos:** ES Modules (ESM - `import`/`export`)
- **Herramientas de Desarrollo:** Nodemon

---

## 📂 Estructura del Proyecto

```text
proyecto-eventos/
├── src/
│   ├── app.js               # Configuración de Express, middlewares y rutas base
│   ├── server.js            # Punto de entrada y puesta en marcha del servidor
│   ├── config/              # Configuraciones globales (BD, variables de entorno)
│   ├── controllers/         # Manejo de peticiones HTTP (req) y respuestas (res)
│   ├── dao/                 # Data Access Objects (Acceso directo a datos)
│   ├── middlewares/         # Middlewares globales y específicos
│   ├── models/              # Esquemas y clases de datos (User, Event)
│   ├── repositories/        # Capa de abstracción entre servicios y DAOs
│   ├── routes/              # Definición de endpoints de la API
│   ├── services/            # Lógica de negocio principal
│   └── utils/               # Funciones auxiliares y herramientas reutilizables
├── .env                     # Variables de entorno locales
├── .env.example             # Plantilla para variables de entorno
├── .gitignore               # Archivos excluidos del control de versiones
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Documentación del proyecto

 *⚙️ Variables de Entorno
Para ejecutar la aplicación es necesario configurar las variables de entorno. Crea un archivo .env en la raíz del proyecto tomando como referencia el archivo .env.example: *

