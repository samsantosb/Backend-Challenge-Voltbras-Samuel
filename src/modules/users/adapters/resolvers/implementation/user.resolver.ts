import { RequestUserDTO } from "../dtos/request.user.dto";
import { ResponseUserDTO } from "../dtos/response.user.dto";
import { IUserService } from "../../../domain/services/user.service.interface";
import { IUserResolver } from "../../../domain/ports/user.resolver.interface";

export class UserResolver implements IUserResolver {
  constructor(private userService: IUserService) {}

  public Query = {
    getAllUsers: async () => {
      const users = await this.userService.getAll();

      const response = users.map((user) => new ResponseUserDTO(user));

      return response;
    },
    getUserById: async (_: any, { id }: { id: string }) => {
      const user = await this.userService.getById(id);

      const reponse = new ResponseUserDTO(user);

      return reponse;
    },
    getUserByEmail: async (_: any, { email }: { email: string }) => {
      const user = await this.userService.getByEmail(email);

      const response = new ResponseUserDTO(user);

      return response;
    },
  };

  public Mutation = {
    createUser: async (_: any, { user }: { user: RequestUserDTO }) => {
      const request = new RequestUserDTO(user);

      const newUser = await this.userService.create(request);

      const response = new ResponseUserDTO(newUser);

      return response;
    },
    updateUser: async (
      _: any,
      { id, user }: { id: string; user: RequestUserDTO }
    ) => {
      const request = new RequestUserDTO(user);

      const updatedUser = await this.userService.update(id, request);

      const response = new ResponseUserDTO(updatedUser);

      return response;
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      const deletedUser = await this.userService.softDelete(id);

      const response = new ResponseUserDTO(deletedUser);

      return response;
    },
  };
}
