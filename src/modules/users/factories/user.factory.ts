import { UserModel } from "../models/user.model";
import { UserRepository } from "../repositories/implementation/user.repository";
import { UserService } from "../services/implementation/user.service";

function userFactory() {
  const repository = new UserRepository(UserModel);
  const service = new UserService(repository);

  return service;
}
