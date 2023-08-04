import { fakeReservation } from "./fake.reservation";
import { mongooseReservationModel } from "../model/reservation.mongoose.model";

export const fakeReservationModel = {
  find: jest.fn().mockImplementation(() => ({
    populate: jest
      .fn()
      .mockImplementation(() =>
        Array.from({ length: 10 }, () => fakeReservation)
      ),
  })),
  findById: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeReservation),
  })),
  create: jest.fn().mockImplementation(() => fakeReservation),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeReservation),
} as unknown as mongooseReservationModel;
