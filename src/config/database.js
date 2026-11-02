import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log("⏳ Intentando conectar a MongoDB local...");
    
    
    await mongoose.connect('mongodb://127.0.0.1:27017/eventos_db');
    
    console.log("🟢 Conexión a MongoDB establecida exitosamente");
  } catch (error) {
    console.error("🔴 Error al conectar a MongoDB:", error.message);
  }
};