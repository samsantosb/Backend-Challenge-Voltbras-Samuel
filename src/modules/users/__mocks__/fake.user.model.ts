import { Model } from "mongoose";
import { fakeUser } from "./fake.user";
import { User } from "../models/user.model";

export const fakeUserModel = {
  find: jest.fn().mockImplementation(() => ({
    populate: jest
      .fn()
      .mockImplementation(() => Array.from({ length: 10 }, () => fakeUser)),
  })),
  findById: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeUser),
  })),
  findOne: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeUser),
  })),
  create: jest.fn().mockImplementation(() => fakeUser),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeUser),
} as unknown as Model<User>;
