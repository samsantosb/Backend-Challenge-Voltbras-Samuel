import { z } from "zod";
import { utcDate } from "../../utils/parsers/utc.date.parser";
import { Types } from "mongoose";

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
    recharge.endDate = utcDate(String(recharge.endDate));
    recharge.startDate = utcDate(String(recharge.startDate));

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
