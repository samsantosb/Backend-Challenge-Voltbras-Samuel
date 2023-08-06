import { ObjectId, Types } from "mongoose";
import { RequestUserDTO } from "../dtos/request.user.dto";
import { User } from "../model/user.type";

export abstract class IUserService {
  abstract getAll(): Promise<User[]>;
  abstract getByEmail(email: string | Types.ObjectId): Promise<User>;
  abstract create(data: RequestUserDTO): Promise<User>;
  abstract update(id: string, data: RequestUserDTO): Promise<User>;
  abstract softDelete(id: string): Promise<User>;
}
