import { fakeStationRepository } from "../../../stations/__mocks__/fake.station.repository";
import { NasaPlanetsService } from "../nasa/nasa.service";
import { PlanetService } from "../planet.service";

const nasaService = new NasaPlanetsService();
const planetService = new PlanetService(nasaService, fakeStationRepository);

describe("Planet Service", () => {
  it("should get planets with heavy mass", async () => {
    const planets = await planetService.getPlanets();

    const massarray = planets.map((planet) => planet.mass);

    const lowestMass = 10;

    expect(Math.min(...massarray) > lowestMass).toEqual(true);
  });
});
