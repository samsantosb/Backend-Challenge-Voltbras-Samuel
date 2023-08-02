import { IUserRepository } from "../user.repository.interface";
import {
  mongooseUserModel,
  mongooseUserSchema,
} from "../model/user.mongoose.model";
import { RequestUserDTO } from "../../dtos/request.user.dto";
import { Model, Types } from "mongoose";
import { UserMapper } from "../mappers/users.moongose.mapper";
import { User } from "../../entities/user.entity";
import { isIdValid } from "../../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../../utils/errorHandler/error.messages";

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

  async getById(id: string): Promise<User> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const user = await this.populateUsers(this.userModel.findById(id));

    const parsedUser: User = UserMapper.mongoToDomain(user);

    return parsedUser;
  }

  async getByEmail(email: string): Promise<User> {
    const user = (await this.populateUsers(
      this.userModel.findOne({ email: email })
    )) as mongooseUserSchema;

    const parsedUser: User = UserMapper.mongoToDomain(user);

    return parsedUser;
  }

  async create(user: RequestUserDTO): Promise<User> {
    const newUser = (await this.userModel.create(
      user
    )) as unknown as mongooseUserSchema;

    const parsedUser: User = UserMapper.mongoToDomain(newUser);

    return parsedUser;
  }

  async update(id: string, user: RequestUserDTO): Promise<User> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedUser = (await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    })) as mongooseUserSchema;

    const parsedUser: User = UserMapper.mongoToDomain(updatedUser);

    return parsedUser;
  }

  async softDelete(id: string): Promise<User> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

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
