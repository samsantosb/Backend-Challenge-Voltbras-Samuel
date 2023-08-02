import { RequestStationDTO } from "../../dtos/request.station.dto";
import { ResponseStationDTO } from "../../dtos/response.station.dto";
import { IStationService } from "../../services/station.service.interface";
import { IStationResolver } from "../station.resolver.interface";

export class StationResolver implements IStationResolver {
  constructor(private stationService: IStationService) {}

  public Query = {
    getAllStations: async () => {
      const stations = await this.stationService.getAll();

      const response = stations.map(
        (station) => new ResponseStationDTO(station)
      );

      return response;
    },
    getStationById: async (_: any, { id }: { id: string }) => {
      const station = await this.stationService.getById(id);

      const response = new ResponseStationDTO(station);

      return response;
    },
    getStationByPlanetName: async (_: any, { name }: { name: string }) => {
      const station = await this.stationService.getByPlanetName(name);

      const response = new ResponseStationDTO(station);

      return response;
    },
  };

  public Mutation = {
    createStation: async (
      _: any,
      { station }: { station: RequestStationDTO }
    ) => {
      const request = new RequestStationDTO(station);

      const newStation = await this.stationService.create(request);

      const response = new ResponseStationDTO(newStation);

      return response;
    },
    updateStation: async (
      _: any,
      { id, station }: { id: string; station: RequestStationDTO }
    ) => {
      const request = new RequestStationDTO(station);

      const updatedStation = await this.stationService.update(id, request);

      const response = new ResponseStationDTO(updatedStation);

      return response;
    },
    deleteStation: async (_: any, { id }: { id: string }) => {
      const deletedStation = await this.stationService.softDelete(id);

      const response = new ResponseStationDTO(deletedStation);

      return response;
    },
  };
}
