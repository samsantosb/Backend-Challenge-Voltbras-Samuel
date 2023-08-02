import { UserModel } from "../models/user.model";
import { UserRepository } from "../repositories/implementation/user.repository";
import { UserService } from "../services/implementation/user.service";
import { UserResolver } from "../resolvers/implementation/user.resolver";

function userFactory() {
  const repository = new UserRepository(UserModel);
  const service = new UserService(repository);
  const { Query, Mutation } = new UserResolver(service);

  return { Query, Mutation };
}
