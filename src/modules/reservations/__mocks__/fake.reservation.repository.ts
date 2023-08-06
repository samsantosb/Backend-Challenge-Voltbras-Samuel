import { IReservationRepository } from "../repositories/reservation.repository.interface";
import { fakeReservation } from "./fake.reservation";

export const fakeReservationRepository = {
  createReservation() {
    return Promise.resolve(fakeReservation);
  },

  getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeReservation));
  },

  getById() {
    return Promise.resolve(fakeReservation);
  },

  getAllByStationName() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeReservation));
  },

  update() {
    return Promise.resolve(fakeReservation);
  },
} as unknown as IReservationRepository;
