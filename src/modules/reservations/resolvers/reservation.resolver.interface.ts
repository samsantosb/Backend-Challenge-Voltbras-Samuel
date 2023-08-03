import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { ResponseReservationDTO } from "../dtos/response.reservation.dto";

export abstract class IReservationResolver {
  abstract Query: {
    getAllReservations: () => Promise<ResponseReservationDTO[]>;
    getReservationById: (
      _: any,
      { id }: { id: string }
    ) => Promise<ResponseReservationDTO>;
  };

  abstract Mutation: {
    createReservation: (
      _: any,
      { reservation }: { reservation: RequestReservationDTO }
    ) => Promise<ResponseReservationDTO>;
    updateReservation: (
      _: any,
      { id, reservation }: { id: string; reservation: RequestReservationDTO }
    ) => Promise<ResponseReservationDTO>;
    deleteReservation: (
      _: any,
      { id }: { id: string }
    ) => Promise<ResponseReservationDTO>;
  };
}
