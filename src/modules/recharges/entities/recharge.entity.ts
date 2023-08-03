export class Recharge {
  public _id: string;
  public station: string;
  public user: string;
  public inProgress: boolean;
  public startDate: Date;
  public endDate: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(recharge: Recharge) {
    this._id = recharge._id;
    this.station = recharge.station;
    this.user = recharge.user;
    this.inProgress = recharge.inProgress;
    this.startDate = recharge.startDate;
    this.endDate = recharge.endDate;
    this.createdAt = recharge.createdAt;
    this.updatedAt = recharge.updatedAt;
    this.deletedAt = recharge.deletedAt;
  }
}
