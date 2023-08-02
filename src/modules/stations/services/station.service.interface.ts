import { RequestStationDTO } from "../dtos/request.station.dto";
import { Station } from "../entities/station.entity";

export abstract class IStationService {
  abstract getAll(): Promise<Station[]>;
  abstract getById(id: string): Promise<Station>;
  abstract getByPlanetName(name: string): Promise<Station>;
  abstract create(data: RequestStationDTO): Promise<Station>;
  abstract update(id: string, data: RequestStationDTO): Promise<Station>;
  abstract softDelete(id: string): Promise<Station>;
}
