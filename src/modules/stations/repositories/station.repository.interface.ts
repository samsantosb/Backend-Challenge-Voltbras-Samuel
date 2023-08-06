import { RequestStationDTO } from "../dtos/request.station.dto";
import { Station } from "../model/station.type";

export abstract class IStationRepository {
  abstract getAll(): Promise<Station[] | null>;
  abstract getByName(name: string): Promise<Station | null>;
  abstract getByPlanetName(name: string): Promise<Station | null>;
  abstract create(station: RequestStationDTO): Promise<Station | null>;
  abstract update(
    id: string,
    station: RequestStationDTO
  ): Promise<Station | null>;
  abstract softDelete(id: string): Promise<Station | null>;
}
