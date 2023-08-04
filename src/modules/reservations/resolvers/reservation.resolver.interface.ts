import { RequestReservationDTO } from "../dtos/request.reservation.dto";

import { Reservation } from "../entities/reservation.entity";

export abstract class IReservationResolver {
  abstract Query: {
    getAllReservations: () => Promise<Partial<Reservation>[]>;
    getReservationById: (
      _: any,
      { id }: { id: string }
    ) => Promise<Partial<Reservation>>;
  };

  abstract Mutation: {
    createReservation: (
      _: any,
      { reservation }: { reservation: RequestReservationDTO }
    ) => Promise<Partial<Reservation>>;
    updateReservation: (
      _: any,
      { id, reservation }: { id: string; reservation: RequestReservationDTO }
    ) => Promise<Partial<Reservation>>;
    deleteReservation: (
      _: any,
      { id }: { id: string }
    ) => Promise<Partial<Reservation>>;
  };
}
