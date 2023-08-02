import { Types } from "mongoose";

export function isIdValid(id: string): boolean {
  return Types.ObjectId.isValid(id);
}
