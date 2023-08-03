import { StationHistory } from "../entities/station.history.entity";

export class ResponseStationHistoryDTO {
  public station: string;
  public user: string;
  public rechargeTime: Date;
  public duration: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(stationHistory: StationHistory) {
    this.station = stationHistory.station;
    this.user = stationHistory.user;
    this.rechargeTime = stationHistory.rechargeTime;
    this.duration = stationHistory.duration;
    this.createdAt = stationHistory.createdAt;
    this.updatedAt = stationHistory.updatedAt;
    this.deletedAt = stationHistory.deletedAt;
  }
}
