import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeRecharge } from "../../__mocks__/fake.recharge";
import { fakeRechargeService } from "../../__mocks__/fake.recharge.service";
import { RechargeResolver } from "../recharge.resolver";
import { RequestRechargeDTO } from "../../dtos/request.reacharge.dto";
import { fakeRequestRecharge } from "../../__mocks__/fake.request.recharge";

const rechargeResolver = new RechargeResolver(fakeRechargeService);

describe("RechargeResolver", () => {
  describe("Query.getAllRecharges", () => {
    it("should return all recharges", async () => {
      const response = await rechargeResolver.Query.getAllRecharges();

      expect(response).toEqual(Array.from({ length: 10 }, () => fakeRecharge));
    });
  });

  describe("Mutation.createRecharge", () => {
    it("should create a new recharge", async () => {
      const response = await rechargeResolver.Mutation.recharge(null, {
        recharge: new RequestRechargeDTO(fakeRecharge),
      });

      expect(response).toEqual(fakeRecharge);
    });
  });

  describe("Query.stationHistory", () => {
    it("should return all recharges of a station", async () => {
      const response = await rechargeResolver.Query.stationHistory(null, {
        stationName: fakeRecharge.stationName,
      });

      expect(response).toEqual(Array.from({ length: 10 }, () => fakeRecharge));
    });
  });
});
