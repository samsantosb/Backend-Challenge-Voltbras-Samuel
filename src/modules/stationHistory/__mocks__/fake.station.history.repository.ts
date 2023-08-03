import { IStationHistoryRepository } from "../repositories/station.history.repository.interface";
import { fakeStationHistory } from "./fake.station.history";

export const fakeStationHistoryRepository = {
  create() {
    return Promise.resolve(fakeStationHistory);
  },

  getAll() {
    return Promise.resolve(
      Array.from({ length: 10 }, () => fakeStationHistory)
    );
  },

  getById() {
    return Promise.resolve(fakeStationHistory);
  },

  update() {
    return Promise.resolve(fakeStationHistory);
  },

  softDelete() {
    return Promise.resolve(fakeStationHistory);
  },
} as unknown as IStationHistoryRepository;
