import axios from "axios";
import { INasaPlanetsService, SuitablePlanets } from "./nasa.service.interface";

export class NasaPlanetsService implements INasaPlanetsService {
  private readonly baseURL: string;

  constructor() {
    this.baseURL =
      "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,%20pl_bmassj+from+ps+where+pl_bmassj+>20&format=json";
  }

  public async getPlanets(): Promise<SuitablePlanets[]> {
    const response = await axios.get(this.baseURL);

    const planetsData = response.data;

    const planets: SuitablePlanets[] = [];
    planetsData.forEach((planet: any) =>
      planets.push({
        name: planet.pl_name,
        mass: planet.pl_bmassj,
      })
    );

    return planets;
  }
}
