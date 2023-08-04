import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeStationHistory } from "../../__mocks__/fake.station.history";
import { fakeStationHistoryModel } from "../../__mocks__/fake.station.history.model";
import { StationHistoryMongooseRepository } from "../station.history.mongoose.repository";

const stationHistoryRepository = new StationHistoryMongooseRepository(
  fakeStationHistoryModel
);

describe("StationHistoryRepository", () => {
  describe("getAll", () => {
    it("should return all station histories", async () => {
      const stationHistories = await stationHistoryRepository.getAll();

      expect(stationHistories).toEqual(
        Array.from({ length: 10 }, () => fakeStationHistory)
      );
    });
    it("should call the find method of the stationHistoryModel", async () => {
      await stationHistoryRepository.getAll();

      expect(fakeStationHistoryModel.find).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a station history", async () => {
      const stationHistory = await stationHistoryRepository.getById(
        fakeMongoObjectId
      );

      expect(stationHistory).toEqual(fakeStationHistory);
    });
    it("should call the findById method of the stationHistoryModel", async () => {
      await stationHistoryRepository.getById(fakeMongoObjectId);

      expect(fakeStationHistoryModel.findById).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(
        stationHistoryRepository.getById("invalidId")
      ).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a station history", async () => {
      const stationHistory = await stationHistoryRepository.create(
        fakeStationHistory
      );

      expect(stationHistory).toEqual(fakeStationHistory);
    });
    it("should call the create method of the stationHistoryModel", async () => {
      await stationHistoryRepository.create(fakeStationHistory);

      expect(fakeStationHistoryModel.create).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should return a station history", async () => {
      const stationHistory = await stationHistoryRepository.update(
        fakeMongoObjectId,
        fakeStationHistory
      );

      expect(stationHistory).toEqual(fakeStationHistory);
    });
    it("should call the findByIdAndUpdate method of the stationHistoryModel", async () => {
      await stationHistoryRepository.update(
        fakeMongoObjectId,
        fakeStationHistory
      );

      expect(fakeStationHistoryModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(
        stationHistoryRepository.update("invalidId", fakeStationHistory)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a station history", async () => {
      const stationHistory = await stationHistoryRepository.softDelete(
        fakeMongoObjectId
      );

      expect(stationHistory).toEqual(fakeStationHistory);
    });
    it("should call the findByIdAndUpdate method of the stationHistoryModel", async () => {
      await stationHistoryRepository.softDelete(fakeMongoObjectId);

      expect(fakeStationHistoryModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(
        stationHistoryRepository.softDelete("invalidId")
      ).rejects.toThrow();
    });
  });
});
