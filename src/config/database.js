import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log("⏳ Intentando conectar a MongoDB local...");
    
    
   await mongoose.connect(process.env.MONGO_URI);
    
    console.log("🟢 Conexión a MongoDB establecida exitosamente");
  } catch (error) {
    console.error("🔴 Error al conectar a MongoDB:", error.message);
  }
};