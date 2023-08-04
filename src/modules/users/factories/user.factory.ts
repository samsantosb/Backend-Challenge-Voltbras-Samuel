import { UserModel } from "../model/user.mongoose.model";
import { UserMongooseRepository } from "../repository/user.mongoose.repository";
import { UserService } from "../services/user.service";
import { UserResolver } from "../resolvers/user.resolver";

function userFactory() {
  const mongooseRepository = new UserMongooseRepository(UserModel);
  const service = new UserService(mongooseRepository);
  const { Query, Mutation } = new UserResolver(service);

  return { Query, Mutation };
}

export const userModule = userFactory();
