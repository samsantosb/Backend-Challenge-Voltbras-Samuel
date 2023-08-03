import { z } from "zod";

export class RequestReservationDTO {
  station: string;
  user: string;
  startTime: Date;
  endTime: Date;
  inProgress: boolean;

  private static schema = z.object({
    station: z.string(),
    user: z.string(),
    startTime: z.date(),
    endTime: z.date(),
    inProgress: z.boolean(),
  });

  constructor(reservation: z.infer<typeof RequestReservationDTO.schema>) {
    const validatedReservation =
      RequestReservationDTO.schema.safeParse(reservation);

    if (!validatedReservation.success) {
      throw new Error(
        `Invalid reservation data: ${validatedReservation.error}`
      );
    }

    this.station = validatedReservation.data.station;
    this.user = validatedReservation.data.user;
    this.startTime = new Date();
    this.endTime = validatedReservation.data.endTime;
    this.inProgress = validatedReservation.data.inProgress;
  }
}
