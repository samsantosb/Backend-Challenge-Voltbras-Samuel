import { Recharge } from "../../recharges/model/recharge.model";
import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { Reservation } from "../model/reservation.type";

export abstract class IReservationResolver {
  abstract Query: {
    getAllReservations: () => Promise<Partial<Partial<Reservation>>[]>;
  };

  abstract Mutation: {
    reservation: (
      _: any,
      { reservation }: { reservation: RequestReservationDTO }
    ) => Promise<Partial<Reservation>>;
    triggerReservation: (_: any, { id }: { id: string }) => Promise<Recharge>;
    updateReservation: (
      _: any,
      { id, reservation }: { id: string; reservation: RequestReservationDTO }
    ) => Promise<Partial<Reservation>>;
  };
}
