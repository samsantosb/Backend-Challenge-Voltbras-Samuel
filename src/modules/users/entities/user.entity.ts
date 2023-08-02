export class User {
  public _id: string;
  public name: string;
  public email: string;
  public password: string;
  public recharges: string[];
  public reservations: string[];
  public stationHistories: string[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  constructor(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.recharges = user.recharges;
    this.reservations = user.reservations;
    this.stationHistories = user.stationHistories;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }
}
