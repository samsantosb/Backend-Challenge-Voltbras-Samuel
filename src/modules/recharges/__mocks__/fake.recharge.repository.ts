import { fakeReservation } from "../../reservations/__mocks__/fake.reservation";
import { IRechargeRepository } from "../repositories/recharge.repository.interface";
import { fakeRecharge } from "./fake.recharge";

export const fakeRechargeRepository = {
  create() {
    return Promise.resolve(fakeRecharge);
  },

  getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeRecharge));
  },

  getAllByStationName() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeRecharge));
  },

  getReservationByStationName() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeReservation));
  },

  getById() {
    return Promise.resolve(fakeRecharge);
  },

  update() {
    return Promise.resolve(fakeRecharge);
  },
} as unknown as IRechargeRepository;
