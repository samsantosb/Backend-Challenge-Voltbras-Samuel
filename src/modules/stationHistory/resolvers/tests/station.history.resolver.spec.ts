import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeStationHistory } from "../../__mocks__/fake.station.history";
import { fakeStationHistoryService } from "../../__mocks__/fake.station.history.service";
import { StationHistoryResolver } from "../implementation/station.history.resolver";
import { RequestStationHistoryDTO } from "../../dtos/request.station.history.dto";
import { ResponseStationHistoryDTO } from "../../dtos/response.station.history.dto";
import { fakeRequestStationHistory } from "../../__mocks__/fake.request.station.history";

const stationHistoryResolver = new StationHistoryResolver(
  fakeStationHistoryService
);

describe("StationHistoryResolver", () => {
  describe("Query.getAllStationHistories", () => {
    it("should return all station histories", async () => {
      const response =
        await stationHistoryResolver.Query.getAllStationHistories();

      expect(response).toEqual(
        Array.from(
          { length: 10 },
          () => new ResponseStationHistoryDTO(fakeStationHistory)
        )
      );
    });
  });

  describe("Query.getStationHistoryById", () => {
    it("should return a station history by ID", async () => {
      const response = await stationHistoryResolver.Query.getStationHistoryById(
        null,
        {
          id: fakeMongoObjectId,
        }
      );

      expect(response).toEqual(
        new ResponseStationHistoryDTO(fakeStationHistory)
      );
    });
  });

  describe("Mutation.createStationHistory", () => {
    it("should create a new station history", async () => {
      const response =
        await stationHistoryResolver.Mutation.createStationHistory(null, {
          stationHistory: new RequestStationHistoryDTO(fakeStationHistory),
        });

      expect(response).toEqual(
        new ResponseStationHistoryDTO(fakeStationHistory)
      );
    });

    it("should throw an error if rechargeTime is not a valid date", async () => {
      const fakeStationHistoryWithInvalidDate = JSON.parse(
        JSON.stringify(fakeRequestStationHistory)
      );
      fakeStationHistoryWithInvalidDate.rechargeTime = "invalid_date";

      try {
        await stationHistoryResolver.Mutation.createStationHistory(null, {
          stationHistory: fakeStationHistoryWithInvalidDate,
        });
      } catch (error) {
        const expectedError = {
          code: "invalid_date",
          received: "invalid_date",
          path: ["rechargeTime"],
          message: "Expected date, received string",
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });
  });

  describe("Mutation.updateStationHistory", () => {
    it("should update an existing station history", async () => {
      const response =
        await stationHistoryResolver.Mutation.updateStationHistory(null, {
          id: fakeMongoObjectId,
          stationHistory: new RequestStationHistoryDTO(fakeStationHistory),
        });

      expect(response).toEqual(
        new ResponseStationHistoryDTO(fakeStationHistory)
      );
    });
    it("should throw an error if rechargeTime is not a valid date", async () => {
      const fakeStationHistoryWithInvalidDate = JSON.parse(
        JSON.stringify(fakeRequestStationHistory)
      );
      fakeStationHistoryWithInvalidDate.rechargeTime = "invalid_date";

      try {
        await stationHistoryResolver.Mutation.updateStationHistory(null, {
          id: fakeMongoObjectId,
          stationHistory: fakeStationHistoryWithInvalidDate,
        });
      } catch (error) {
        const expectedError = {
          code: "invalid_date",
          received: "invalid_date",
          path: ["rechargeTime"],
          message: "Expected date, received string",
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });
  });

  describe("Mutation.deleteStationHistory", () => {
    it("should delete an existing station history", async () => {
      const response =
        await stationHistoryResolver.Mutation.deleteStationHistory(null, {
          id: fakeMongoObjectId,
        });

      expect(response).toEqual(
        new ResponseStationHistoryDTO(fakeStationHistory)
      );
    });
  });
});
