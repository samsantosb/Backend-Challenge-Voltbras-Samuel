import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeStation } from "../../__mocks__/fake.station";
import { fakeStationModel } from "../../__mocks__/fake.station.model";
import { StationMongooseRepository } from "../station.mongoose.repository";

const stationRepository = new StationMongooseRepository(fakeStationModel);

describe("StationRepository", () => {
  describe("getAll", () => {
    it("should return all stations", async () => {
      const stations = await stationRepository.getAll();

      expect(stations).toEqual(Array.from({ length: 10 }, () => fakeStation));
    });
    it("should call the find method of the stationModel", async () => {
      await stationRepository.getAll();

      expect(fakeStationModel.find).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a station", async () => {
      const station = await stationRepository.getById(fakeMongoObjectId);

      expect(station).toEqual(fakeStation);
    });
    it("should call the findById method of the stationModel", async () => {
      await stationRepository.getById(fakeMongoObjectId);

      expect(fakeStationModel.findById).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(stationRepository.getById("invalidId")).rejects.toThrow();
    });
  });

  describe("getByName", () => {
    it("should return a station", async () => {
      const station = await stationRepository.getByName(fakeStation.name);

      expect(station).toEqual(fakeStation);
    });
    it("should call the findOne method of the stationModel", async () => {
      await stationRepository.getByName(fakeStation.name);

      expect(fakeStationModel.findOne).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    it("should return a station", async () => {
      const station = await stationRepository.create(fakeStation);

      expect(station).toEqual(fakeStation);
    });
    it("should call the create method of the stationModel", async () => {
      await stationRepository.create(fakeStation);

      expect(fakeStationModel.create).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should return a station", async () => {
      const station = await stationRepository.update(
        fakeMongoObjectId,
        fakeStation
      );

      expect(station).toEqual(fakeStation);
    });
    it("should call the findByIdAndUpdate method of the stationModel", async () => {
      await stationRepository.update(fakeMongoObjectId, fakeStation);

      expect(fakeStationModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(
        stationRepository.update("invalidId", fakeStation)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a station", async () => {
      const station = await stationRepository.softDelete(fakeMongoObjectId);

      expect(station).toEqual(fakeStation);
    });
    it("should call the findByIdAndUpdate method of the stationModel", async () => {
      await stationRepository.softDelete(fakeMongoObjectId);

      expect(fakeStationModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(stationRepository.softDelete("invalidId")).rejects.toThrow();
    });
  });
});
