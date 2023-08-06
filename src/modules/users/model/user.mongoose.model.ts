import { Schema, model, Model, InferSchemaType, Types } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    deletedAt: Date,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export type userSchema = InferSchemaType<typeof UserSchema>;

export type mongooseUserModel = Model<userSchema>;

export type mongooseUserSchema = userSchema & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const UserModel = model("User", UserSchema);
