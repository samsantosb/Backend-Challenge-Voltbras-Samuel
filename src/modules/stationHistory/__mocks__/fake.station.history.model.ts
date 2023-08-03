import { fakeStationHistory } from "./fake.station.history";
import { mongooseStationHistoryModel } from "../repositories/model/station.history.mongoose.model";

export const fakeStationHistoryModel = {
  find: jest.fn().mockImplementation(() => ({
    populate: jest
      .fn()
      .mockImplementation(() =>
        Array.from({ length: 10 }, () => fakeStationHistory)
      ),
  })),
  findById: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeStationHistory),
  })),
  create: jest.fn().mockImplementation(() => fakeStationHistory),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeStationHistory),
} as unknown as mongooseStationHistoryModel;
