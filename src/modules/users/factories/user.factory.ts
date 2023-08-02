import { UserModel } from "../adapters/mongoose/model/user.mongoose.model";
import { UserMongooseRepository } from "../adapters/mongoose/implementation/user.moongose.repository";
import { UserService } from "../domain/services/implementation/user.service";
import { UserResolver } from "../adapters/resolvers/implementation/user.resolver";

function userFactory() {
  const mongooseRepository = new UserMongooseRepository(UserModel);
  const service = new UserService(mongooseRepository);
  const { Query, Mutation } = new UserResolver(service);

  return { Query, Mutation };
}

export const userModule = userFactory();
