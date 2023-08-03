import { RequestStationHistoryDTO } from "../dtos/request.station.history.dto";
import { fakeStationHistory } from "./fake.station.history";
import { IStationHistoryService } from "../services/station.history.service.interface";

export const fakeStationHistoryService = {
  async getAll() {
    return Promise.resolve(
      Array.from({ length: 10 }, () => fakeStationHistory)
    );
  },

  async getById(_id: string) {
    return Promise.resolve(fakeStationHistory);
  },

  async create(_stationHistory: RequestStationHistoryDTO) {
    return Promise.resolve(fakeStationHistory);
  },

  async update(_id: string, _stationHistory: RequestStationHistoryDTO) {
    return Promise.resolve(fakeStationHistory);
  },

  async softDelete(_id: string) {
    return Promise.resolve(fakeStationHistory);
  },
} as unknown as IStationHistoryService;
