import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['user', 'organizer', 'admin'], 
      default: 'user' 
    }
  },
  {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
  }
);

export const userModel = mongoose.model(userCollection, userSchema);