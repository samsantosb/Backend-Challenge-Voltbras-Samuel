import { RequestUserDTO } from "../dtos/request.user.dto";
import { ResponseUserDTO } from "../dtos/response.user.dto";

export abstract class IUserResolver {
  abstract Query: {
    getAllUsers: () => Promise<ResponseUserDTO[]>;
    getUserByEmail: (
      _: any,
      { email }: { email: string }
    ) => Promise<ResponseUserDTO>;
  };

  abstract Mutation: {
    createUser: (
      _: any,
      { user }: { user: RequestUserDTO }
    ) => Promise<ResponseUserDTO>;
    updateUser: (
      _: any,
      { id, user }: { id: string; user: RequestUserDTO }
    ) => Promise<ResponseUserDTO>;
    deleteUser: (_: any, { id }: { id: string }) => Promise<ResponseUserDTO>;
  };
}
