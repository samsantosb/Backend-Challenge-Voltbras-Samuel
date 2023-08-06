import { z } from "zod";
export class RequestRechargeDTO {
  stationName: string;
  userEmail: string;
  startDate: string | Date;
  endDate: string | Date;
  inProgress: boolean;

  private static schema = z.object({
    stationName: z.string(),
    userEmail: z.string().email(),
    endDate: z.date().or(z.string()),
  });

  constructor(recharge: any) {
    recharge.endDate = String(recharge.endDate);

    const validatedRecharge = RequestRechargeDTO.schema.safeParse(recharge);

    if (!validatedRecharge.success) {
      throw new Error(`Invalid recharge data: ${validatedRecharge.error}`);
    }

    this.stationName = validatedRecharge.data.stationName;
    this.userEmail = validatedRecharge.data.userEmail;
    this.startDate = new Date();
    this.endDate = validatedRecharge.data.endDate;
    this.inProgress = true;
  }
}
