import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeStationHistory } from "../../__mocks__/fake.station.history";
import { fakeStationHistoryRepository } from "../../__mocks__/fake.station.history.repository";
import { StationHistoryService } from "../implementation/station.history.service";

const stationHistoryService = new StationHistoryService(
  fakeStationHistoryRepository
);

describe("StationHistoryService", () => {
  describe("getAll", () => {
    it("should return all station histories", async () => {
      const stationHistories = await stationHistoryService.getAll();

      expect(stationHistories).toEqual(
        Array.from({ length: 10 }, () => fakeStationHistory)
      );
    });
    it("should throw an error if no station histories are found", async () => {
      jest
        .spyOn(fakeStationHistoryRepository, "getAll")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(stationHistoryService.getAll()).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return a station history", async () => {
      const stationHistory = await stationHistoryService.getById(
        fakeMongoObjectId
      );

      expect(stationHistory).toEqual(fakeStationHistory);
    });
    it("should throw an error if no station history is found", async () => {
      jest
        .spyOn(fakeStationHistoryRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        stationHistoryService.getById(fakeMongoObjectId)
      ).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a station history", async () => {
      const stationHistory = await stationHistoryService.create(
        fakeStationHistory
      );

      expect(stationHistory).toEqual(fakeStationHistory);
    });
    it("should throw an error if the station history cannot be created", async () => {
      jest
        .spyOn(fakeStationHistoryRepository, "create")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        stationHistoryService.create(fakeStationHistory)
      ).rejects.toThrow();
    });
  });

  describe("update", () => {
    it("should return a station history", async () => {
      const stationHistory = await stationHistoryService.update(
        fakeMongoObjectId,
        fakeStationHistory
      );

      expect(stationHistory).toEqual(fakeStationHistory);
    });
    it("should throw an error if the station history cannot be updated", async () => {
      jest
        .spyOn(fakeStationHistoryRepository, "update")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        stationHistoryService.update(fakeMongoObjectId, fakeStationHistory)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a station history", async () => {
      const stationHistory = await stationHistoryService.softDelete(
        fakeMongoObjectId
      );

      expect(stationHistory).toEqual(fakeStationHistory);
    });
    it("should throw an error if the station history cannot be deleted", async () => {
      jest
        .spyOn(fakeStationHistoryRepository, "softDelete")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        stationHistoryService.softDelete(fakeMongoObjectId)
      ).rejects.toThrow();
    });
  });
});
