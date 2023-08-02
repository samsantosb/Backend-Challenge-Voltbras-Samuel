import { UserModel } from "../repository/model/user.mongoose.model";
import { UserMongooseRepository } from "../repository/implementation/user.moongose.repository";
import { UserService } from "../services/implementation/user.service";
import { UserResolver } from "../resolvers/implementation/user.resolver";

function userFactory() {
  const mongooseRepository = new UserMongooseRepository(UserModel);
  const service = new UserService(mongooseRepository);
  const { Query, Mutation } = new UserResolver(service);

  return { Query, Mutation };
}

export const userModule = userFactory();
