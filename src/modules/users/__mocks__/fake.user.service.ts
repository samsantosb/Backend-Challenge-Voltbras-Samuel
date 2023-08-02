import { RequestUserDTO } from "../resolvers/dtos/request.user.dto";
import { fakeUser } from "./fake.user";
import { IUserService } from "../services/user.service.interface";

export const fakeUserService = {
  async getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeUser));
  },

  async getById(_id: string) {
    return Promise.resolve(fakeUser);
  },

  async getByEmail(_email: string) {
    return Promise.resolve(fakeUser);
  },

  async create(_user: RequestUserDTO) {
    return Promise.resolve(fakeUser);
  },

  async update(_id: string, _user: RequestUserDTO) {
    return Promise.resolve(fakeUser);
  },

  async softDelete(_id: string) {
    return Promise.resolve(fakeUser);
  },
} as unknown as IUserService;
