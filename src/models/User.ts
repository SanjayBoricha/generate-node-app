import { Schema, model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  __v?: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  __v: { type: Number, select: false }
});

const User = model<IUser>('User', userSchema);

export default User;
