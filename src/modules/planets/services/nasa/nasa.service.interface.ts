export abstract class INasaPlanetsService {
  abstract getPlanets(): Promise<SuitablePlanets[]>;
}

export type SuitablePlanets = {
  name: string;
  mass: number;
};
