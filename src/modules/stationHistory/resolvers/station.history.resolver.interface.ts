import { RequestStationHistoryDTO } from "../dtos/request.station.history.dto";
import { StationHistory } from "../entities/station.history.entity";

export abstract class IStationHistoryResolver {
  abstract Query: {
    getAllStationHistories: () => Promise<Partial<StationHistory>[]>;
    getStationHistoryById: (
      _: any,
      { id }: { id: string }
    ) => Promise<Partial<StationHistory>>;
  };

  abstract Mutation: {
    createStationHistory: (
      _: any,
      { stationHistory }: { stationHistory: RequestStationHistoryDTO }
    ) => Promise<Partial<StationHistory>>;
    updateStationHistory: (
      _: any,
      {
        id,
        stationHistory,
      }: { id: string; stationHistory: RequestStationHistoryDTO }
    ) => Promise<Partial<StationHistory>>;
    deleteStationHistory: (
      _: any,
      { id }: { id: string }
    ) => Promise<Partial<StationHistory>>;
  };
}
