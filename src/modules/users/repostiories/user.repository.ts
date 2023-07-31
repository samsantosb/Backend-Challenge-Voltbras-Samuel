import { IUserRepository } from "./user.repository.interface";
import { User, UserModel } from "../models/user.model";
import { RequestUserDTO } from "../dtos/request.user.dto";

export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[] | null> {
    const users = await this.populateUsers(UserModel.find());

    return users;
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.populateUsers(UserModel.findById(id));

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.populateUsers(UserModel.findOne({ email: email }));

    return user;
  }

  async create(data: RequestUserDTO): Promise<User | null> {
    const newUser = await UserModel.create(data);

    return newUser;
  }

  async update(id: string, data: RequestUserDTO): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return updatedUser;
  }

  async softDelete(id: string): Promise<User | null> {
    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    return deletedUser;
  }

  private populateUsers(query: any): any {
    return query
      .populate("recharges")
      .populate("reservations")
      .populate("histories");
  }
}
