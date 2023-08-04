import { z } from "zod";

export class RequestStationDTO {
  planetName: string;
  recharges: string[];
  reservations: string[];
  stationHistories: string[];

  private static schema = z.object({
    planetName: z.string(),
    recharges: z.array(z.string()),
    reservations: z.array(z.string()),
    stationHistories: z.array(z.string()),
  });

  constructor(station: z.infer<typeof RequestStationDTO.schema>) {
    const validatedStation = RequestStationDTO.schema.safeParse(station);

    if (!validatedStation.success) {
      throw new Error(`Invalid station data: ${validatedStation.error}`);
    }

    this.planetName = validatedStation.data.planetName;
    this.recharges = validatedStation.data.recharges;
    this.reservations = validatedStation.data.reservations;
    this.stationHistories = validatedStation.data.stationHistories;
  }
}
