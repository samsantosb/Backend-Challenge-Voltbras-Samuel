import { RequestStationDTO } from "../dtos/request.station.dto";
import { ResponseStationDTO } from "../dtos/response.station.dto";

export abstract class IStationResolver {
  abstract Query: {
    getAllStations: () => Promise<ResponseStationDTO[]>;
    getStationById: (
      _: any,
      { id }: { id: string }
    ) => Promise<ResponseStationDTO>;
    getStationByPlanetName: (
      _: any,
      { name }: { name: string }
    ) => Promise<ResponseStationDTO>;
  };

  abstract Mutation: {
    createStation: (
      _: any,
      { station }: { station: RequestStationDTO }
    ) => Promise<ResponseStationDTO>;
    updateStation: (
      _: any,
      { id, station }: { id: string; station: RequestStationDTO }
    ) => Promise<ResponseStationDTO>;
    deleteStation: (
      _: any,
      { id }: { id: string }
    ) => Promise<ResponseStationDTO>;
  };
}
