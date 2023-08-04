import { ResponseUserDTO } from "./../../users/dtos/response.user.dto";
import { IAuthService } from "../services/auth.service.interface";
import { IAuthResolver } from "./auth.resolver.interface";

export class AuthResolver implements IAuthResolver {
  constructor(private authService: IAuthService) {}

  public Mutation = {
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const token = await this.authService.login(email, password);

      return { token };
    },
  };
}
