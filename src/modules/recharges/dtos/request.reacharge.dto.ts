import { z } from "zod";

export class RequestRechargeDTO {
  station: string;
  user: string;
  inProgress: boolean;
  startDate: Date;
  endDate: Date;

  private static schema = z.object({
    station: z.string(),
    user: z.string(),
    inProgress: z.boolean(),
    endDate: z.date(),
  });

  constructor(recharge: z.infer<typeof RequestRechargeDTO.schema>) {
    const validatedRecharge = RequestRechargeDTO.schema.safeParse(recharge);

    if (!validatedRecharge.success) {
      throw new Error(`Invalid recharge data: ${validatedRecharge.error}`);
    }

    this.station = validatedRecharge.data.station;
    this.user = validatedRecharge.data.user;
    this.inProgress = validatedRecharge.data.inProgress;
    this.startDate = new Date();
    this.endDate = validatedRecharge.data.endDate;
  }
}
