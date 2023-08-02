import { IUserRepository } from "../user.repository.interface";
import {
  mongooseUserModel,
  mongooseUserSchema,
} from "../model/user.mongoose.model";
import { RequestUserDTO } from "../../resolvers/dtos/request.user.dto";
import { Model, Types } from "mongoose";
import { UserMapper } from "../mappers/user.moongose.mapper";
import { User } from "../../entities/user.entity";

export class UserMongooseRepository implements IUserRepository {
  constructor(private readonly userModel: mongooseUserModel) {}

  async getAll(): Promise<User[] | null> {
    const users = (await this.populateUsers(
      this.userModel.find()
    )) as mongooseUserSchema[];

    const parsedUsers: User[] = users.map((user: mongooseUserSchema) =>
      UserMapper.mongoToDomain(user)
    );

    return parsedUsers;
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.populateUsers(this.userModel.findById(id));

    const parsedUser: User = UserMapper.mongoToDomain(user);

    return parsedUser;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = (await this.populateUsers(
      this.userModel.findOne({ email: email })
    )) as mongooseUserSchema;

    const parsedUser: User = UserMapper.mongoToDomain(user);

    return parsedUser;
  }

  async create(user: RequestUserDTO): Promise<User | null> {
    const newUser = (await this.userModel.create(
      user
    )) as unknown as mongooseUserSchema;

    const parsedUser: User = UserMapper.mongoToDomain(newUser);

    return parsedUser;
  }

  async update(id: string, user: RequestUserDTO): Promise<User | null> {
    const updatedUser = (await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    })) as mongooseUserSchema;

    const parsedUser: User = UserMapper.mongoToDomain(updatedUser);

    return parsedUser;
  }

  async softDelete(id: string): Promise<User | null> {
    const deletedUser = (await this.userModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    )) as mongooseUserSchema;

    const parsedUser: User = UserMapper.mongoToDomain(deletedUser);

    return parsedUser;
  }

  private populateUsers(query: any): any {
    return query.populate(["Recharges", "Reservations", "StationHistories"]);
  }
}
