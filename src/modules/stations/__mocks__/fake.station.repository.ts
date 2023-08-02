import { IStationRepository } from "../repositories/station.repository.interface";
import { fakeStation } from "./fake.station";

export const fakeStationRepository = {
  create() {
    return Promise.resolve(fakeStation);
  },

  getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeStation));
  },

  getById() {
    return Promise.resolve(fakeStation);
  },

  getByPlanetName() {
    return Promise.resolve(fakeStation);
  },

  update() {
    return Promise.resolve(fakeStation);
  },

  softDelete() {
    return Promise.resolve(fakeStation);
  },
} as unknown as IStationRepository;
