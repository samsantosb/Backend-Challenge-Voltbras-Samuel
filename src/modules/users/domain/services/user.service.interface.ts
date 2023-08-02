import { ObjectId } from "mongoose";
import { RequestUserDTO } from "../../adapters/resolvers/dtos/request.user.dto";
import { User } from "../entities/user.entity";

export abstract class IUserService {
  abstract getAll(): Promise<User[]>;
  abstract getById(id: string): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
  abstract create(data: RequestUserDTO): Promise<User>;
  abstract update(id: string, data: RequestUserDTO): Promise<User>;
  abstract softDelete(id: string): Promise<User>;
}
