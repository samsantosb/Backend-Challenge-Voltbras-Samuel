import { z } from "zod";

export class RequestStationHistoryDTO {
  station: string;
  user: string;
  rechargeTime: Date | string;
  duration: number;

  private static schema = z.object({
    station: z.string(),
    user: z.string(),
    rechargeTime: z.date(),
    duration: z.number(),
  });

  constructor(stationHistory: Partial<RequestStationHistoryDTO>) {
    const validatedStationHistory =
      RequestStationHistoryDTO.schema.safeParse(stationHistory);

    if (!validatedStationHistory.success) {
      throw new Error(
        `Invalid station history data: ${validatedStationHistory.error}`
      );
    }

    this.station = validatedStationHistory.data.station;
    this.user = validatedStationHistory.data.user;
    this.rechargeTime = new Date(validatedStationHistory.data.rechargeTime);
    this.duration = validatedStationHistory.data.duration;
  }
}
