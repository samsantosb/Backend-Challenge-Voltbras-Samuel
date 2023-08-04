import { Planet } from "../model/planet.type";

export interface IPlanetService {
  getPlanets(): Promise<Planet[]>;
}
