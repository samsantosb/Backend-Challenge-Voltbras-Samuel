import { Planet } from "../model/planet.type";

export abstract class IPlanetResolver {
  abstract Query: {
    suitablePlanets: () => Promise<Planet[]>;
  };
}
