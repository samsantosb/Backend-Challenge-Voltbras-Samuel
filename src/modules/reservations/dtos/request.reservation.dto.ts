import { z } from "zod";

export class RequestReservationDTO {
  stationName: string;
  userEmail: string;
  startDate: string | Date;
  endDate: string | Date;

  private static schema = z.object({
    stationName: z.string(),
    userEmail: z.string().email(),
    startDate: z.date().or(z.string()),
    endDate: z.date().or(z.string()),
  });

  constructor(recharge: any) {
    recharge.endDate = String(recharge.endDate);
    recharge.startDate = String(recharge.startDate);

    const validatedRecharge = RequestReservationDTO.schema.safeParse(recharge);

    if (!validatedRecharge.success) {
      throw new Error(`Invalid recharge data: ${validatedRecharge.error}`);
    }

    this.stationName = validatedRecharge.data.stationName;
    this.userEmail = validatedRecharge.data.userEmail;
    this.startDate = validatedRecharge.data.startDate;
    this.endDate = validatedRecharge.data.endDate;
  }
}
