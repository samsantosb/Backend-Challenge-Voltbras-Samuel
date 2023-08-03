import { mongooseStationHistorySchema } from "../model/station.history.mongoose.model";
import { StationHistory } from "../../entities/station.history.entity";

export class StationHistoryMapper {
  static mongoToDomain(
    stationHistory: mongooseStationHistorySchema
  ): StationHistory {
    const rawStationHistory = {
      _id: stationHistory._id.toString(),
      station: stationHistory.station.toString(),
      user: stationHistory.user.toString(),
      rechargeTime: stationHistory.rechargeTime,
      duration: stationHistory.duration,
      createdAt: stationHistory.createdAt,
      updatedAt: stationHistory.updatedAt,
      deletedAt: stationHistory.deletedAt,
    };

    return rawStationHistory;
  }
}
