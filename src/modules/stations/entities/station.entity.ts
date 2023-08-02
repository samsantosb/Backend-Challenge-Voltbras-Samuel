export class Station {
  public _id: string;
  public planetName: string;
  public recharges: string[];
  public reservations: string[];
  public histories: string[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(station: Station) {
    this._id = station._id;
    this.planetName = station.planetName;
    this.recharges = station.recharges;
    this.reservations = station.reservations;
    this.histories = station.histories;
    this.createdAt = station.createdAt;
    this.updatedAt = station.updatedAt;
    this.deletedAt = station.deletedAt;
  }
}
