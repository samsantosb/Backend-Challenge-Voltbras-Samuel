import { RequestUserDTO } from "../dtos/request.user.dto";
import { User } from "../models/user.model";

export abstract class IUserRepository {
  abstract getAll(): Promise<User[] | null>;
  abstract getById(id: string): Promise<User | null>;
  abstract getByEmail(email: string): Promise<User | null>;
  abstract create(user: RequestUserDTO): Promise<User | null>;
  abstract update(id: string, user: RequestUserDTO): Promise<User | null>;
  abstract softDelete(id: string): Promise<User | null>;
}
