import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import argon2 from 'argon2';

interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  fullName: string;
  profilePicture: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  roles: 'Admin' | 'User' | 'Moderator';
  status: 'Active' | 'Suspended' | 'Deactivated';
  lastLogin?: Date;
  address: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  activityLog: {
    action: string;
    timestamp: Date;
  }[];
  isOnline: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  twoFactorEnabled: boolean;
  notifications: boolean;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  dateOfBirth: { type: Date },
  phoneNumber: { type: String, default: '' },
  roles: [{ type: String, enum: ['Admin', 'User', 'Moderator'], default: 'User' }],
  status: { type: String, enum: ['Active', 'Suspended', 'Deactivated'], default: 'Active' },
  lastLogin: { type: Date },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String }
  },
  activityLog: [
    {
      action: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  isOnline: { type: Boolean },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  twoFactorEnabled: { type: Boolean, default: false },
  notifications: { type: Boolean, default: true },
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
    next(error as CallbackError);
  }
});

// Method to validate password
userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return argon2.verify(this.password, password);
};

export const User = mongoose.model<IUser>('User', userSchema);
