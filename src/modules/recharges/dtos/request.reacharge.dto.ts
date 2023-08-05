import { z } from "zod";
import { utcDate } from "../../utils/parsers/utc.date.parser";

export class RequestRechargeDTO {
  stationId: string;
  userId: string;
  startDate: string | Date;
  endDate: string | Date;
  inProgress: boolean;

  private static schema = z.object({
    stationId: z.string(),
    userId: z.string(),
    endDate: z.date().or(z.string()),
  });

  constructor(recharge: z.infer<typeof RequestRechargeDTO.schema>) {
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
