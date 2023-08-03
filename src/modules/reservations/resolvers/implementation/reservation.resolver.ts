import { RequestReservationDTO } from "../../dtos/request.reservation.dto";
import { ResponseReservationDTO } from "../../dtos/response.reservation.dto";
import { IReservationService } from "../../services/reservation.service.interface";
import { IReservationResolver } from "../reservation.resolver.interface";

export class ReservationResolver implements IReservationResolver {
  constructor(private reservationService: IReservationService) {}

  public Query = {
    getAllReservations: async () => {
      const reservations = await this.reservationService.getAll();

      const response = reservations.map(
        (reservation) => new ResponseReservationDTO(reservation)
      );

      return response;
    },
    getReservationById: async (_: any, { id }: { id: string }) => {
      const reservation = await this.reservationService.getById(id);

      const response = new ResponseReservationDTO(reservation);

      return response;
    },
  };

  public Mutation = {
    createReservation: async (
      _: any,
      { reservation }: { reservation: RequestReservationDTO }
    ) => {
      const request = new RequestReservationDTO(reservation);

      const newReservation = await this.reservationService.create(request);

      const response = new ResponseReservationDTO(newReservation);

      return response;
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

      const response = new ResponseReservationDTO(updatedReservation);

      return response;
    },
    deleteReservation: async (_: any, { id }: { id: string }) => {
      const deletedReservation = await this.reservationService.softDelete(id);

      const response = new ResponseReservationDTO(deletedReservation);

      return response;
    },
  };
}
