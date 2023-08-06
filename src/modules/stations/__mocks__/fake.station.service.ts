import { RequestStationDTO } from "../dtos/request.station.dto";
import { fakeStation } from "./fake.station";
import { IStationService } from "../services/station.service.interface";

export const fakeStationService = {
  async getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeStation));
  },

  async getById(id: string) {
    return Promise.resolve(fakeStation);
  },

  async getByName(name: string) {
    return Promise.resolve(fakeStation);
  },

  async getByPlanetName(name: string) {
    return Promise.resolve(fakeStation);
  },

  async create(station: RequestStationDTO) {
    return Promise.resolve(fakeStation);
  },

  async update(id: string, station: RequestStationDTO) {
    return Promise.resolve(fakeStation);
  },

  async softDelete(id: string) {
    return Promise.resolve(fakeStation);
  },
} as unknown as IStationService;
