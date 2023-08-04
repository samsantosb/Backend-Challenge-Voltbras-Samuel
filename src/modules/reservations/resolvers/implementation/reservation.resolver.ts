import { RequestReservationDTO } from "../../dtos/request.reservation.dto";
import { IReservationService } from "../../services/reservation.service.interface";
import { IReservationResolver } from "../reservation.resolver.interface";

export class ReservationResolver implements IReservationResolver {
  constructor(private reservationService: IReservationService) {}

  public Query = {
    getAllReservations: async () => {
      const reservations = await this.reservationService.getAll();

      return reservations;
    },
    getReservationById: async (_: any, { id }: { id: string }) => {
      const reservation = await this.reservationService.getById(id);

      return reservation;
    },
  };

  public Mutation = {
    createReservation: async (
      _: any,
      { reservation }: { reservation: RequestReservationDTO }
    ) => {
      const request = new RequestReservationDTO(reservation);

      const newReservation = await this.reservationService.create(request);

      return newReservation;
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
    deleteReservation: async (_: any, { id }: { id: string }) => {
      const deletedReservation = await this.reservationService.softDelete(id);

      return deletedReservation;
    },
  };
}
