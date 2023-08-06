import { fakeReservation } from "./fake.reservation"; // Você precisará criar este objeto fake.
import { mongooseReservationModel } from "../model/reservation.mongoose.model";

export const fakeReservationModel = {
  find: jest
    .fn()
    .mockImplementation(() =>
      Array.from({ length: 10 }, () => fakeReservation)
    ),
  findById: jest.fn().mockImplementation(() => fakeReservation),
  findOne: jest.fn().mockImplementation(() => fakeReservation),
  create: jest.fn().mockImplementation(() => fakeReservation),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeReservation),
} as unknown as mongooseReservationModel;
