import { IStationHistoryRepository } from "./station.history.repository.interface";
import {
  mongooseStationHistoryModel,
  mongooseStationHistorySchema,
} from "../model/station.history.mongoose.model";
import { RequestStationHistoryDTO } from "../dtos/request.station.history.dto";
import { StationHistory } from "../model/station.history.type";
import { isIdValid } from "../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";

export class StationHistoryMongooseRepository
  implements IStationHistoryRepository
{
  constructor(
    private readonly stationHistoryModel: mongooseStationHistoryModel
  ) {}

  async getAll(): Promise<StationHistory[]> {
    const stationHistories = await this.populateStationHistories(
      this.stationHistoryModel.find()
    );

    return stationHistories;
  }

  async getById(id: string): Promise<StationHistory> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const stationHistory = await this.populateStationHistories(
      this.stationHistoryModel.findById(id)
    );

    return stationHistory;
  }

  async create(
    stationHistory: RequestStationHistoryDTO
  ): Promise<StationHistory> {
    const newStationHistory = await this.stationHistoryModel.create(
      stationHistory
    );

    return newStationHistory;
  }

  async update(
    id: string,
    stationHistory: RequestStationHistoryDTO
  ): Promise<StationHistory | null> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedStationHistory =
      await this.stationHistoryModel.findByIdAndUpdate(id, stationHistory, {
        new: true,
      });

    return updatedStationHistory;
  }

  async softDelete(id: string): Promise<StationHistory | null> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const deletedStationHistory =
      await this.stationHistoryModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );

    return deletedStationHistory;
  }

  private populateStationHistories(query: any): any {
    return query.populate(["station", "user"]);
  }
}
