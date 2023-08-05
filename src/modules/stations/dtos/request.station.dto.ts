import { z } from "zod";

export class RequestStationDTO {
  planetName: string;
  stationName: string;

  private static schema = z.object({
    planetName: z.string(),
    stationName: z.string(),
  });

  constructor(station: z.infer<typeof RequestStationDTO.schema>) {
    const validatedStation = RequestStationDTO.schema.safeParse(station);

    if (!validatedStation.success) {
      throw new Error(`Invalid station data: ${validatedStation.error}`);
    }

    this.planetName = validatedStation.data.planetName;
    this.stationName = validatedStation.data.stationName;
  }
}
