import { IUserRepository } from "../repository/user.repository.interface";
import { fakeUser } from "./fake.user";

export const fakeUserRepository = {
  create() {
    return Promise.resolve(fakeUser);
  },

  getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeUser));
  },

  getById() {
    return Promise.resolve(fakeUser);
  },

  getByEmail() {
    return Promise.resolve(fakeUser);
  },

  update() {
    return Promise.resolve(fakeUser);
  },

  softDelete() {
    return Promise.resolve(fakeUser);
  },
} as unknown as IUserRepository;
