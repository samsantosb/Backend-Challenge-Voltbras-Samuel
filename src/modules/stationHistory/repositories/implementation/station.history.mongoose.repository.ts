import { IStationHistoryRepository } from "../station.history.repository.interface";
import {
  mongooseStationHistoryModel,
  mongooseStationHistorySchema,
} from "../model/station.history.mongoose.model";
import { StationHistoryMapper } from "../mappers/station.history.mapper";
import { RequestStationHistoryDTO } from "../../dtos/request.station.history.dto";
import { StationHistory } from "../../entities/station.history.entity";
import { isIdValid } from "../../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../../utils/errorHandler/error.messages";

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

    const parsedStationHistories: StationHistory[] = stationHistories.map(
      (stationHistory: mongooseStationHistorySchema) =>
        StationHistoryMapper.mongoToDomain(stationHistory)
    );

    return parsedStationHistories;
  }

  async getById(id: string): Promise<StationHistory> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const stationHistory = await this.populateStationHistories(
      this.stationHistoryModel.findById(id)
    );

    const parsedStationHistory =
      StationHistoryMapper.mongoToDomain(stationHistory);

    return parsedStationHistory;
  }

  async create(
    stationHistory: RequestStationHistoryDTO
  ): Promise<StationHistory> {
    const newStationHistory = (await this.stationHistoryModel.create(
      stationHistory
    )) as unknown as mongooseStationHistorySchema;

    const parsedStationHistory =
      StationHistoryMapper.mongoToDomain(newStationHistory);

    return parsedStationHistory;
  }

  async update(
    id: string,
    stationHistory: RequestStationHistoryDTO
  ): Promise<StationHistory> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedStationHistory =
      (await this.stationHistoryModel.findByIdAndUpdate(id, stationHistory, {
        new: true,
      })) as mongooseStationHistorySchema;

    const parsedStationHistory = StationHistoryMapper.mongoToDomain(
      updatedStationHistory
    );

    return parsedStationHistory;
  }

  async softDelete(id: string): Promise<StationHistory> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const deletedStationHistory =
      (await this.stationHistoryModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      )) as mongooseStationHistorySchema;

    const parsedStationHistory = StationHistoryMapper.mongoToDomain(
      deletedStationHistory
    );

    return parsedStationHistory;
  }

  private populateStationHistories(query: any): any {
    return query.populate(["Station", "User"]);
  }
}
