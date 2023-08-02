import { ObjectId } from "mongoose";
import { RequestUserDTO } from "../dtos/request.user.dto";
import { User } from "../models/user.model";

export abstract class IUserService {
  abstract getAll(): Promise<User[]>;
  abstract getById(id: string): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
  abstract create(data: RequestUserDTO): Promise<User>;
  abstract update(id: string, data: RequestUserDTO): Promise<User>;
  abstract softDelete(id: string): Promise<User>;
}
