import { InferSchemaType, Model, Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const RechargeSchema = new Schema({
  station: { type: ObjectId, ref: "Station" },
  user: { type: ObjectId, ref: "User" },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  inProgress: Boolean,
});

export type Recharge = InferSchemaType<typeof RechargeSchema>;

export const RechargeModel: Model<Recharge> = model("Recharge", RechargeSchema);
