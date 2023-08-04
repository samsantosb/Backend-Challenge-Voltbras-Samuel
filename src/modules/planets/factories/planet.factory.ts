import { stationModule } from "./../../stations/factories/station.factory";
import { PlanetService } from "../services/planet.service";
import { PlanetResolver } from "../resolvers/planet.resolver";
import { NasaPlanetsService } from "../services/nasa/nasa.service";

function planetFactory() {
  const nasaService = new NasaPlanetsService();
  const service = new PlanetService(
    nasaService,
    stationModule.mongooseStationRepository
  );
  const { Query } = new PlanetResolver(service);

  return { Query };
}

export const planetModule = planetFactory();
