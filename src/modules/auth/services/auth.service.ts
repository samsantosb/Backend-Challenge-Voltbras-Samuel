import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserService } from "../../users/services/user.service.interface";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { IAuthService } from "./auth.service.interface";
import { ResponseUserDTO } from "../../users/dtos/response.user.dto";
import { rule } from "graphql-shield";

export class AuthService implements IAuthService {
  constructor(private readonly userService: IUserService) {}

  async login(email: string, password: string) {
    const user = await this.userService.getByEmail(email);

    const isValidPassword = await this.comparePasswords(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new Error(ErrorMessages.INVALID_CREDENTIALS);
    }

    const threeDays = "3d";

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: threeDays,
    });

    return token;
  }

  private async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    return isPasswordValid;
  }

  authenticationMiddleware() {
    return rule()(async (parent, args, context, info) => {
      const authHeader = context.req.headers.authorization;

      if (authHeader) {
        const token = authHeader.split("Bearer ")[1];

        if (token) {
          try {
            const payload = jwt.verify(
              token,
              process.env.JWT_SECRET as string
            ) as jwt.JwtPayload;

            context.userId = payload.id;
            return true;
          } catch (err) {
            console.log(err);
            throw new Error(ErrorMessages.UNAUTHORIZED);
          }
        }
        throw new Error(ErrorMessages.UNAUTHORIZED);
      }

      const publicRoutes = ["login", "createUser"];

      if (publicRoutes.includes(info.fieldName)) {
        return true;
      }

      throw new Error(ErrorMessages.UNAUTHORIZED);
    });
  }
}
