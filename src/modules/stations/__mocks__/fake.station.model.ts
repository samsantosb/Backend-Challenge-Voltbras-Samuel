import { Model } from "mongoose";
import { fakeStation } from "./fake.station";
import { mongooseStationModel } from "../model/station.mongoose.model";

export const fakeStationModel = {
  find: jest.fn().mockImplementation(() => ({
    populate: jest
      .fn()
      .mockImplementation(() => Array.from({ length: 10 }, () => fakeStation)),
  })),
  findById: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeStation),
  })),
  findOne: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeStation),
  })),
  create: jest.fn().mockImplementation(() => fakeStation),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeStation),
} as unknown as mongooseStationModel;
