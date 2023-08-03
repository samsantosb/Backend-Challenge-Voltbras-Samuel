import { RequestStationHistoryDTO } from "../dtos/request.station.history.dto";
import { ResponseStationHistoryDTO } from "../dtos/response.station.history.dto";

export abstract class IStationHistoryResolver {
  abstract Query: {
    getAllStationHistories: () => Promise<ResponseStationHistoryDTO[]>;
    getStationHistoryById: (
      _: any,
      { id }: { id: string }
    ) => Promise<ResponseStationHistoryDTO>;
  };

  abstract Mutation: {
    createStationHistory: (
      _: any,
      { stationHistory }: { stationHistory: RequestStationHistoryDTO }
    ) => Promise<ResponseStationHistoryDTO>;
    updateStationHistory: (
      _: any,
      {
        id,
        stationHistory,
      }: { id: string; stationHistory: RequestStationHistoryDTO }
    ) => Promise<ResponseStationHistoryDTO>;
    deleteStationHistory: (
      _: any,
      { id }: { id: string }
    ) => Promise<ResponseStationHistoryDTO>;
  };
}
