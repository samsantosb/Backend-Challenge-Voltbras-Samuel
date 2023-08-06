import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeUserService } from "../../../users/__mocks__/fake.user.service";
import { fakeStation } from "../../__mocks__/fake.station";
import { fakeStationRepository } from "../../__mocks__/fake.station.repository";
import { StationService } from "../station.service";

const stationService = new StationService(
  fakeStationRepository,
  fakeUserService
);

describe("StationService", () => {
  describe("getAll", () => {
    it("should return all stations", async () => {
      const stations = await stationService.getAll();

      expect(stations).toEqual(Array.from({ length: 10 }, () => fakeStation));
    });
    it("should throw an error if no stations are found", async () => {
      jest
        .spyOn(fakeStationRepository, "getAll")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(stationService.getAll()).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return a station", async () => {
      const station = await stationService.getById(fakeMongoObjectId);

      expect(station).toEqual(fakeStation);
    });
    it("should throw an error if no station is found", async () => {
      jest
        .spyOn(fakeStationRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(stationService.getById(fakeMongoObjectId)).rejects.toThrow();
    });
  });

  describe("getByPlanetName", () => {
    it("should return a station", async () => {
      const station = await stationService.getByPlanetName(
        fakeStation.planetName
      );

      expect(station).toEqual(fakeStation);
    });
    it("should throw an error if no station is found", async () => {
      jest
        .spyOn(fakeStationRepository, "getByPlanetName")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        stationService.getByPlanetName(fakeStation.planetName)
      ).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a station", async () => {
      const station = await stationService.create(fakeStation);

      expect(station).toEqual(fakeStation);
    });
    it("should throw an error if the station cannot be created", async () => {
      jest
        .spyOn(fakeStationRepository, "create")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(stationService.create(fakeStation)).rejects.toThrow();
    });
  });

  describe("update", () => {
    it("should return a station", async () => {
      const station = await stationService.update(
        fakeMongoObjectId,
        fakeStation
      );

      expect(station).toEqual(fakeStation);
    });
    it("should throw an error if the station cannot be updated", async () => {
      jest
        .spyOn(fakeStationRepository, "update")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        stationService.update(fakeMongoObjectId, fakeStation)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a station", async () => {
      const station = await stationService.softDelete(fakeMongoObjectId);

      expect(station).toEqual(fakeStation);
    });
    it("should throw an error if the station cannot be deleted", async () => {
      jest
        .spyOn(fakeStationRepository, "softDelete")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        stationService.softDelete(fakeMongoObjectId)
      ).rejects.toThrow();
    });
  });
});
