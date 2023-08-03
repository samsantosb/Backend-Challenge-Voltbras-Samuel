import { Reservation } from "../entities/reservation.entity";

export class ResponseReservationDTO {
  public station: string;
  public user: string;
  public startTime: Date;
  public endTime: Date;
  public inProgress: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(reservation: Reservation) {
    this.station = reservation.station;
    this.user = reservation.user;
    this.startTime = reservation.startTime;
    this.endTime = reservation.endTime;
    this.inProgress = reservation.inProgress;
    this.createdAt = reservation.createdAt;
    this.updatedAt = reservation.updatedAt;
    this.deletedAt = reservation.deletedAt;
  }
}
