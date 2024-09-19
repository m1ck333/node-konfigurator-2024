import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone?: string;
  city?: string;
  country?: string;
  address?: string;
  zipCode?: string;
  region?: string;
  title?: string;
  companyName?: string;
  companyPhone?: string;
  fax?: string;
  contactEmail?: string;
  role: "admin" | "user";
  rememberToken?: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, default: null },
  city: { type: String, default: null },
  country: { type: String, default: null },
  address: { type: String, default: null },
  zipCode: { type: String, default: null },
  region: { type: String, default: null },
  title: { type: String, default: null },
  companyName: { type: String, default: null },
  companyPhone: { type: String, default: null },
  fax: { type: String, default: null },
  contactEmail: { type: String, default: null },
  role: { 
    type: String, 
    enum: ["admin", "user"],
    default: "user" 
  },
  rememberToken: { type: String, default: null },
  refreshToken: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IUser>("User", UserSchema);
