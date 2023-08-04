import { IUserRepository } from "../user.repository.interface";
import {
  mongooseUserModel,
  mongooseUserSchema,
} from "../model/user.mongoose.model";
import { RequestUserDTO } from "../../dtos/request.user.dto";
import { User } from "../../entities/user.entity";
import { isIdValid } from "../../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../../utils/errorHandler/error.messages";

export class UserMongooseRepository implements IUserRepository {
  constructor(private readonly userModel: mongooseUserModel) {}

  async getAll(): Promise<User[] | null> {
    const users = await this.populateUsers(this.userModel.find());

    return users;
  }

  async getById(id: string): Promise<User> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const user = await this.populateUsers(this.userModel.findById(id));

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.populateUsers(
      this.userModel.findOne({ email: email })
    );

    return user;
  }

  async create(user: RequestUserDTO): Promise<User> {
    const newUser = await this.userModel.create(user);

    return newUser;
  }

  async update(id: string, user: RequestUserDTO): Promise<User | null> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });

    return updatedUser;
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

    return deletedUser;
  }

  private populateUsers(query: any): any {
    return query.populate(["recharges", "reservations", "stationHistories"]);
  }
}
