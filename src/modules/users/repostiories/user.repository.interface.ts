import { RequestUserDTO } from "../dtos/request.user.dto";
import { User } from "../models/user.model";

export abstract class IUserRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: RequestUserDTO): Promise<User>;
  abstract update(id: string, data: RequestUserDTO): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
