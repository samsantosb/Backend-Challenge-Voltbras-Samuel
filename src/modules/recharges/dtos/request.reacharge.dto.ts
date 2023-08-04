import { z } from "zod";

export class RequestRechargeDTO {
  station: string;
  user: string;
  inProgress: boolean;
  startDate: string | Date;
  endDate: string | Date;

  private static schema = z.object({
    station: z.string(),
    user: z.string(),
    inProgress: z.boolean(),
    endDate: z.string(),
  });

  constructor(recharge: Partial<RequestRechargeDTO>) {
    const validatedRecharge = RequestRechargeDTO.schema.safeParse(recharge);

    if (!validatedRecharge.success) {
      throw new Error(`Invalid recharge data: ${validatedRecharge.error}`);
    }

    this.station = validatedRecharge.data.station;
    this.user = validatedRecharge.data.user;
    this.inProgress = validatedRecharge.data.inProgress;
    this.startDate = String(new Date());
    this.endDate = validatedRecharge.data.endDate;
  }
}
