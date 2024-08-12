import mongoose, { Schema, Document } from 'mongoose';
import argon2 from 'argon2';

interface IUser extends Document {
  email: string;
  password: string;
  isOnline: boolean;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isOnline: { type: Boolean, default: true }
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    // Hash the password using argon2id
    user.password = await argon2.hash(user.password, { type: argon2.argon2id });
    next();
  } catch (error) {
    next(error);
  }
});

// Method to validate password
userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return argon2.verify(this.password, password);
};

export const User = mongoose.model<IUser>('User', userSchema);
