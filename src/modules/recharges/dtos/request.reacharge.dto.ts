import { z } from "zod";
import { utcDate } from "../../utils/parsers/utc.date.parser";
import { Types } from "mongoose";

export class RequestRechargeDTO {
  stationId: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  startDate: string | Date;
  endDate: string | Date;
  inProgress: boolean;

  private static schema = z.object({
    stationId: z.string(),
    userId: z.string(),
    endDate: z.date().or(z.string()),
  });

  constructor(recharge: any) {
    recharge.endDate = utcDate(String(recharge.endDate));

    const validatedRecharge = RequestRechargeDTO.schema.safeParse(recharge);

    if (!validatedRecharge.success) {
      throw new Error(`Invalid recharge data: ${validatedRecharge.error}`);
    }

    this.stationId = validatedRecharge.data.stationId;
    this.userId = validatedRecharge.data.userId;
    this.startDate = utcDate();
    this.endDate = validatedRecharge.data.endDate;
    this.inProgress = true;
  }
}
