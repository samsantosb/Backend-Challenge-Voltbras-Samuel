import { Schema, model, Model, InferSchemaType } from "mongoose";

const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  recharges: [{ type: ObjectId, ref: "Recharge" }],
  reservations: [{ type: ObjectId, ref: "Reservation" }],
  histories: [{ type: ObjectId, ref: "StationHistory" }],
});

export type User = InferSchemaType<typeof UserSchema>;

export const UserModel: Model<User> = model("User", UserSchema);
