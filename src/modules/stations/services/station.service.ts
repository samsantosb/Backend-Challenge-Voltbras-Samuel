import { RequestStationDTO } from "../dtos/request.station.dto";
import { IStationRepository } from "../repositories/station.repository.interface";
import { IStationService } from "./station.service.interface";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { IUserService } from "../../users/services/user.service.interface";

export class StationService implements IStationService {
  constructor(private readonly stationRepository: IStationRepository) {}

  async getAll() {
    const stations = await this.stationRepository.getAll();

    if (!stations) {
      throw new Error(ErrorMessages.NOT_FOUND("Stations"));
    }

    return stations;
  }

  async getByName(name: string) {
    const station = await this.stationRepository.getByName(name);

    if (!station) {
      throw new Error(ErrorMessages.NOT_FOUND(`Station with name ${name}`));
    }

    return station;
  }

  async getByPlanetName(name: string) {
    const station = await this.stationRepository.getByPlanetName(name);

    if (!station) {
      throw new Error(
        ErrorMessages.NOT_FOUND(`Station with planet name ${name}`)
      );
    }

    return station;
  }

  async create(station: RequestStationDTO) {
    const newStation = await this.stationRepository.create(station);

    if (!newStation) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Station"));
    }

    return newStation;
  }

  async update(id: string, station: RequestStationDTO) {
    const updatedStation = await this.stationRepository.update(id, station);

    if (!updatedStation) {
      throw new Error(ErrorMessages.CANNOT_UPDATE(`Station with id ${id}`));
    }

    return updatedStation;
  }

  async softDelete(id: string) {
    const deletedStation = await this.stationRepository.softDelete(id);

    if (!deletedStation) {
      throw new Error(ErrorMessages.CANNOT_DELETE(`Station with id ${id}`));
    }

    return deletedStation;
  }
}
