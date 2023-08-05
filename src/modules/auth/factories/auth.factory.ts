import { AuthService } from "../services/auth.service";
import { AuthResolver } from "../resolvers/auth.resolver";
import { userModule } from "../../users/factories/user.factory";

function authFactory() {
  const authService = new AuthService(userModule.userService);
  const { Mutation } = new AuthResolver(authService);

  return { Mutation, authService };
}

export const authModule = authFactory();
