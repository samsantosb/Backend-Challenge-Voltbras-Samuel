import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeStation } from "../../__mocks__/fake.station";
import { fakeStationService } from "../../__mocks__/fake.station.service";
import { StationResolver } from "../implementation/station.resolver";
import { RequestStationDTO } from "../../dtos/request.station.dto";
import { ResponseStationDTO } from "../../dtos/response.station.dto";
import { fakeRequestStation } from "../../__mocks__/fake.request.station";

const stationResolver = new StationResolver(fakeStationService);

describe("StationResolver", () => {
  describe("Query.getAllStations", () => {
    it("should return all stations", async () => {
      const response = await stationResolver.Query.getAllStations();

      expect(response).toEqual(
        Array.from({ length: 10 }, () => new ResponseStationDTO(fakeStation))
      );
    });
  });

  describe("Query.getStationById", () => {
    it("should return a station by ID", async () => {
      const response = await stationResolver.Query.getStationById(null, {
        id: fakeMongoObjectId,
      });

      expect(response).toEqual(new ResponseStationDTO(fakeStation));
    });
  });

  describe("Query.getStationByPlanetName", () => {
    it("should return a station by planet name", async () => {
      const response = await stationResolver.Query.getStationByPlanetName(
        null,
        {
          name: fakeStation.planetName,
        }
      );

      expect(response).toEqual(new ResponseStationDTO(fakeStation));
    });
  });

  describe("Mutation.createStation", () => {
    it("should create a new station", async () => {
      const response = await stationResolver.Mutation.createStation(null, {
        station: new RequestStationDTO(fakeStation),
      });

      expect(response).toEqual(new ResponseStationDTO(fakeStation));
    });

    it("should throw an error if planetName is a number", async () => {
      const fakeStationWithNumberName = JSON.parse(
        JSON.stringify(fakeRequestStation)
      );
      fakeStationWithNumberName.planetName = 123;

      try {
        await stationResolver.Mutation.createStation(null, {
          station: fakeStationWithNumberName,
        });
      } catch (error) {
        const expectedError = {
          code: "invalid_type",
          expected: "string",
          received: "number",
          path: ["planetName"],
          message: "Expected string, received number",
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });
  });

  describe("Mutation.updateStation", () => {
    it("should update an existing station", async () => {
      const response = await stationResolver.Mutation.updateStation(null, {
        id: fakeMongoObjectId,
        station: new RequestStationDTO(fakeStation),
      });

      expect(response).toEqual(new ResponseStationDTO(fakeStation));
    });
    it("should throw an error if planetName is a number", async () => {
      const fakeStationWithNumberName = JSON.parse(
        JSON.stringify(fakeRequestStation)
      );
      fakeStationWithNumberName.planetName = 123;

      try {
        await stationResolver.Mutation.updateStation(null, {
          id: fakeMongoObjectId,
          station: fakeStationWithNumberName,
        });
      } catch (error) {
        const expectedError = {
          code: "invalid_type",
          expected: "string",
          received: "number",
          path: ["planetName"],
          message: "Expected string, received number",
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });
  });

  describe("Mutation.deleteStation", () => {
    it("should delete an existing station", async () => {
      const response = await stationResolver.Mutation.deleteStation(null, {
        id: fakeMongoObjectId,
      });

      expect(response).toEqual(new ResponseStationDTO(fakeStation));
    });
  });
});
