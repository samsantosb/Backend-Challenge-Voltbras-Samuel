import { RequestStationHistoryDTO } from "../dtos/request.station.history.dto";
import { StationHistory } from "../model/station.history.type";

export abstract class IStationHistoryService {
  abstract getAll(): Promise<StationHistory[]>;
  abstract getById(id: string): Promise<StationHistory>;
  abstract create(data: RequestStationHistoryDTO): Promise<StationHistory>;
  abstract update(
    id: string,
    data: RequestStationHistoryDTO
  ): Promise<StationHistory>;
  abstract softDelete(id: string): Promise<StationHistory>;
}
