export class StationHistory {
  public _id: string;
  public station: string;
  public user: string;
  public rechargeTime: Date;
  public duration: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(stationHistory: StationHistory) {
    this._id = stationHistory._id;
    this.station = stationHistory.station;
    this.user = stationHistory.user;
    this.rechargeTime = stationHistory.rechargeTime;
    this.duration = stationHistory.duration;
    this.createdAt = stationHistory.createdAt;
    this.updatedAt = stationHistory.updatedAt;
    this.deletedAt = stationHistory.deletedAt;
  }
}
