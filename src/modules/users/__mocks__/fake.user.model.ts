import { fakeUser } from "./fake.user";
import { mongooseUserModel } from "../model/user.mongoose.model";

export const fakeUserModel = {
  find: jest
    .fn()
    .mockImplementation(() => Array.from({ length: 10 }, () => fakeUser)),
  findById: jest.fn().mockImplementation(() => fakeUser),
  findOne: jest.fn().mockImplementation(() => fakeUser),
  create: jest.fn().mockImplementation(() => fakeUser),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeUser),
} as unknown as mongooseUserModel;
