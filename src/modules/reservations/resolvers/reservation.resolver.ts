import { Recharge } from "../../recharges/model/recharge.model";
import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { Reservation } from "../model/reservation.type";
import { IReservationService } from "../services/reservation.service.interface";
import { IReservationResolver } from "./reservation.resolver.interface";

export class ReservationResolver implements IReservationResolver {
  constructor(private readonly reservationService: IReservationService) {}

  public Query = {
    getAllReservations: async () => {
      const reservations = await this.reservationService.getAll();

      return reservations;
    },
  };

  public Mutation = {
    reservation: async (
      _: any,
      { reservation }: { reservation: RequestReservationDTO }
    ) => {
      const request = new RequestReservationDTO(reservation);

      const newReservation = await this.reservationService.createReservation(
        request
      );

      return newReservation;
    },
    triggerReservation: async (
      _: any,
      { id }: { id: string }
    ): Promise<Recharge> => {
      const recharge =
        await this.reservationService.createRechargeByReservation(id);

      return recharge;
    },

    updateReservation: async (
      _: any,
      { id, reservation }: { id: string; reservation: RequestReservationDTO }
    ) => {
      const request = new RequestReservationDTO(reservation);

      const updatedReservation = await this.reservationService.update(
        id,
        request
      );

      return updatedReservation;
    },
  };
}
