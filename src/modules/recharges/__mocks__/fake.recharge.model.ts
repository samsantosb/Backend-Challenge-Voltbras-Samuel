import { fakeRecharge } from "./fake.recharge";
import { mongooseRechargeModel } from "../repositories/model/recharge.mongoose.model";

export const fakeRechargeModel = {
  find: jest.fn().mockImplementation(() => ({
    populate: jest
      .fn()
      .mockImplementation(() => Array.from({ length: 10 }, () => fakeRecharge)),
  })),
  findById: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeRecharge),
  })),
  create: jest.fn().mockImplementation(() => fakeRecharge),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeRecharge),
} as unknown as mongooseRechargeModel;
