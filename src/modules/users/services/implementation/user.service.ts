import { RequestUserDTO } from "../../dtos/request.user.dto";
import { IUserRepository } from "../../repositories/user.repository.interface";
import { IUserService } from "../user.service.interface";
import { isIdValid } from "../../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../../utils/errorHandler/error.messages";
import bcrypt from "bcrypt";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAll() {
    const users = await this.userRepository.getAll();

    if (!users) {
      throw new Error(ErrorMessages.NOT_FOUND("Users"));
    }

    return users;
  }

  async getById(id: string) {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new Error(ErrorMessages.NOT_FOUND(`User with id ${id}`));
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new Error(ErrorMessages.NOT_FOUND(`User with email ${email}`));
    }

    return user;
  }

  async create(user: RequestUserDTO) {
    user.password = await this.hashPassword(user.password);

    const newUser = await this.userRepository.create(user);

    if (!newUser) {
      throw new Error(ErrorMessages.CANNOT_CREATE("User"));
    }

    return newUser;
  }

  async update(id: string, user: RequestUserDTO) {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedUser = await this.userRepository.update(id, user);

    if (!updatedUser) {
      throw new Error(ErrorMessages.CANNOT_UPDATE(`User with id ${id}`));
    }

    return updatedUser;
  }

  async softDelete(id: string) {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const deletedUser = await this.userRepository.softDelete(id);

    if (!deletedUser) {
      throw new Error(ErrorMessages.CANNOT_DELETE(`User with id ${id}`));
    }

    return deletedUser;
  }

  private async hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }

  private async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    return isPasswordValid;
  }
}
