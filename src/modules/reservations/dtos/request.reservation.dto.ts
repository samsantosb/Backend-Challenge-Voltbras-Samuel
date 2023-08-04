import { z } from "zod";

export class RequestReservationDTO {
  station: string;
  user: string;
  startTime: Date | string;
  endTime: Date | string;
  inProgress: boolean;

  private static schema = z.object({
    station: z.string(),
    user: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    inProgress: z.boolean(),
  });

  constructor(reservation: Partial<RequestReservationDTO>) {
    const validatedReservation =
      RequestReservationDTO.schema.safeParse(reservation);

    if (!validatedReservation.success) {
      throw new Error(
        `Invalid reservation data: ${validatedReservation.error}`
      );
    }

    this.station = validatedReservation.data.station;
    this.user = validatedReservation.data.user;
    this.startTime = String(new Date());
    this.endTime = validatedReservation.data.endTime;
    this.inProgress = validatedReservation.data.inProgress;
  }
}
