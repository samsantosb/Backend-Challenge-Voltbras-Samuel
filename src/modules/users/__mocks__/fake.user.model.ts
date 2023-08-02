import { Model } from "mongoose";
import { fakeUser } from "./fake.user";
import { mongooseUserModel } from "../adapters/mongoose/model/user.mongoose.model";

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
} as unknown as mongooseUserModel;
