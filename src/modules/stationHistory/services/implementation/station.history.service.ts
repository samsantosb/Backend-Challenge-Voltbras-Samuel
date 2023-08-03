import { RequestStationHistoryDTO } from "../../dtos/request.station.history.dto";
import { IStationHistoryRepository } from "../../repositories/station.history.repository.interface";
import { IStationHistoryService } from "../station.history.service.interface";
import { ErrorMessages } from "../../../utils/errorHandler/error.messages";

export class StationHistoryService implements IStationHistoryService {
  constructor(
    private readonly stationHistoryRepository: IStationHistoryRepository
  ) {}

  async getAll() {
    const stationHistories = await this.stationHistoryRepository.getAll();

    if (!stationHistories) {
      throw new Error(ErrorMessages.NOT_FOUND("Station Histories"));
    }

    return stationHistories;
  }

  async getById(id: string) {
    const stationHistory = await this.stationHistoryRepository.getById(id);

    if (!stationHistory) {
      throw new Error(ErrorMessages.NOT_FOUND(`Station History with id ${id}`));
    }

    return stationHistory;
  }

  async create(stationHistory: RequestStationHistoryDTO) {
    const newStationHistory = await this.stationHistoryRepository.create(
      stationHistory
    );

    if (!newStationHistory) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Station History"));
    }

    return newStationHistory;
  }

  async update(id: string, stationHistory: RequestStationHistoryDTO) {
    const updatedStationHistory = await this.stationHistoryRepository.update(
      id,
      stationHistory
    );

    if (!updatedStationHistory) {
      throw new Error(
        ErrorMessages.CANNOT_UPDATE(`Station History with id ${id}`)
      );
    }

    return updatedStationHistory;
  }

  async softDelete(id: string) {
    const deletedStationHistory =
      await this.stationHistoryRepository.softDelete(id);

    if (!deletedStationHistory) {
      throw new Error(
        ErrorMessages.CANNOT_DELETE(`Station History with id ${id}`)
      );
    }

    return deletedStationHistory;
  }
}
