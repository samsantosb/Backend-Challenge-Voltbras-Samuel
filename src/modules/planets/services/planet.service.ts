import { IStationRepository } from "../../stations/repositories/station.repository.interface";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { Planet } from "../model/planet.type";
import { NasaPlanetsService } from "./nasa/nasa.service";
import { IPlanetService } from "./planet.service.interface";

export class PlanetService implements IPlanetService {
  constructor(
    private readonly nasaPlanetsService: NasaPlanetsService,
    private readonly stationRepository: IStationRepository
  ) {}

  public async getPlanets(): Promise<Planet[]> {
    const planets = await this.nasaPlanetsService.getPlanets();

    if (!planets) {
      throw new Error(ErrorMessages.NO_PLANETS_FOUND);
    }

    const response: Planet[] = [];

    for (const planet of planets) {
      const verifyExists = await this.stationRepository.getByPlanetName(
        planet.name
      );

      const planetData = {
        ...planet,
        hasStation: Boolean(verifyExists),
      };

      response.push(planetData);
    }

    return response;
  }
}
