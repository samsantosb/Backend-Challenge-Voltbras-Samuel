import { RequestStationDTO } from "../../dtos/request.station.dto";
import { IStationService } from "../../services/station.service.interface";
import { IStationResolver } from "../station.resolver.interface";

export class StationResolver implements IStationResolver {
  constructor(private stationService: IStationService) {}

  public Query = {
    getAllStations: async () => {
      const stations = await this.stationService.getAll();

      return stations;
    },
    getStationById: async (_: any, { id }: { id: string }) => {
      const station = await this.stationService.getById(id);

      return station;
    },
    getStationByPlanetName: async (_: any, { name }: { name: string }) => {
      const station = await this.stationService.getByPlanetName(name);

      return station;
    },
  };

  public Mutation = {
    createStation: async (
      _: any,
      { station }: { station: RequestStationDTO }
    ) => {
      const request = new RequestStationDTO(station);

      const newStation = await this.stationService.create(request);

      return newStation;
    },
    updateStation: async (
      _: any,
      { id, station }: { id: string; station: RequestStationDTO }
    ) => {
      const request = new RequestStationDTO(station);

      const updatedStation = await this.stationService.update(id, request);

      return updatedStation;
    },
    deleteStation: async (_: any, { id }: { id: string }) => {
      const deletedStation = await this.stationService.softDelete(id);

      return deletedStation;
    },
  };
}
