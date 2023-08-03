import { RequestStationHistoryDTO } from "../dtos/request.station.history.dto";
import { StationHistory } from "../entities/station.history.entity";

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
