import { ObjectId, Types } from "mongoose";
export class Station {
  public _id: string | Types.ObjectId;
  public planetName: string;
  public recharges: string[] | Types.ObjectId[];
  public reservations: string[] | Types.ObjectId[];
  public stationHistories: string[] | Types.ObjectId[];
  public createdAt?: Date | string;
  public updatedAt?: Date | string;
  public deletedAt?: Date | string;

  constructor(station: Station) {
    this._id = station._id;
    this.planetName = station.planetName;
    this.recharges = station.recharges;
    this.reservations = station.reservations;
    this.stationHistories = station.stationHistories;
    this.createdAt = station.createdAt;
    this.updatedAt = station.updatedAt;
    this.deletedAt = station.deletedAt;
  }
}
