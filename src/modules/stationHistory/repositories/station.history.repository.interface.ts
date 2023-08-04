import { RequestStationHistoryDTO } from "../dtos/request.station.history.dto";
import { StationHistory } from "../model/station.history.type";

export abstract class IStationHistoryRepository {
  abstract getAll(): Promise<StationHistory[] | null>;
  abstract getById(id: string): Promise<StationHistory | null>;
  abstract create(
    stationHistory: RequestStationHistoryDTO
  ): Promise<StationHistory | null>;
  abstract update(
    id: string,
    stationHistory: RequestStationHistoryDTO
  ): Promise<StationHistory | null>;
  abstract softDelete(id: string): Promise<StationHistory | null>;
}
