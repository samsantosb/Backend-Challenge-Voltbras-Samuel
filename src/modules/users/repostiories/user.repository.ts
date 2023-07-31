import { IUserRepository } from "./user.repository.interface";
import { User } from "../models/user.model";
import { RequestUserDTO } from "../dtos/request.user.dto";
import { Model } from "mongoose";

export class UserRepository implements IUserRepository {
  constructor(private readonly userModel: Model<User>) {}
  async getAll(): Promise<User[] | null> {
    const users = await this.populateUsers(this.userModel.find());

    return users;
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.populateUsers(this.userModel.findById(id));

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.populateUsers(
      this.userModel.findOne({ email: email })
    );

    return user;
  }

  async create(data: RequestUserDTO): Promise<User | null> {
    const newUser = await this.userModel.create(data);

    return newUser;
  }

  async update(id: string, data: RequestUserDTO): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return updatedUser;
  }

  async softDelete(id: string): Promise<User | null> {
    const deletedUser = await this.userModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    return deletedUser;
  }

  private populateUsers(query: any): any {
    return query.populate(["recharges", "reservations", "stationHistories"]);
  }
}
