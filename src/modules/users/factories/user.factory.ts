import { UserModel } from "../model/user.mongoose.model";
import { UserMongooseRepository } from "../repositories/user.mongoose.repository";
import { UserService } from "../services/user.service";
import { UserResolver } from "../resolvers/user.resolver";

function userFactory() {
  const mongooseRepository = new UserMongooseRepository(UserModel);
  const userService = new UserService(mongooseRepository);
  const { Query, Mutation } = new UserResolver(userService);

  return { Query, Mutation, userService };
}

export const userModule = userFactory();
