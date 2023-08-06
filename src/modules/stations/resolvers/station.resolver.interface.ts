import { RequestStationDTO } from "../dtos/request.station.dto";
import { Station } from "../model/station.type";

export abstract class IStationResolver {
  abstract Query: {
    stations: () => Promise<Partial<Station>[]>;
  };

  abstract Mutation: {
    installStation: (
      _: any,
      { station }: { station: RequestStationDTO }
    ) => Promise<Partial<Station>>;
    updateStation: (
      _: any,
      { id, station }: { id: string; station: RequestStationDTO }
    ) => Promise<Partial<Station>>;
    deleteStation: (
      _: any,
      { id }: { id: string }
    ) => Promise<Partial<Station>>;
  };
}
