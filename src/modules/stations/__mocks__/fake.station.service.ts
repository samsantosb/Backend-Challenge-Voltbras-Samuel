import { RequestStationDTO } from "../dtos/request.station.dto";
import { fakeStation } from "./fake.station";
import { IStationService } from "../services/station.service.interface";

export const fakeStationService = {
  async getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeStation));
  },

  async getById(_id: string) {
    return Promise.resolve(fakeStation);
  },

  async getByPlanetName(_name: string) {
    return Promise.resolve(fakeStation);
  },

  async create(_station: RequestStationDTO) {
    return Promise.resolve(fakeStation);
  },

  async update(_id: string, _station: RequestStationDTO) {
    return Promise.resolve(fakeStation);
  },

  async softDelete(_id: string) {
    return Promise.resolve(fakeStation);
  },
} as unknown as IStationService;
