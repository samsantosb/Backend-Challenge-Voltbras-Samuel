export class ResponseStationsDTO {}
import { Station } from "../entities/station.entity";

export class ResponseStationDTO {
  public planetName: string;
  public recharges: Array<string>;
  public reservations: Array<string>;
  public histories: Array<string>;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(public station: Station) {
    this.planetName = station.planetName;
    this.recharges = station.recharges;
    this.reservations = station.reservations;
    this.histories = station.histories;
    this.createdAt = station.createdAt;
    this.updatedAt = station.updatedAt;
    this.deletedAt = station.deletedAt;
  }
}
