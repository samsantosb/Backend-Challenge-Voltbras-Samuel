import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeRecharge } from "../../__mocks__/fake.recharge";
import { fakeRechargeService } from "../../__mocks__/fake.recharge.service";
import { RechargeResolver } from "../implementation/recharge.resolver";
import { RequestRechargeDTO } from "../../dtos/request.reacharge.dto";
import { ResponseRechargeDTO } from "../../dtos/response.recharge.dto";
import { fakeRequestRecharge } from "../../__mocks__/fake.request.recharge";

const rechargeResolver = new RechargeResolver(fakeRechargeService);

describe("RechargeResolver", () => {
  describe("Query.getAllRecharges", () => {
    it("should return all recharges", async () => {
      const response = await rechargeResolver.Query.getAllRecharges();

      expect(response).toEqual(
        Array.from({ length: 10 }, () => new ResponseRechargeDTO(fakeRecharge))
      );
    });
  });

  describe("Query.getRechargeById", () => {
    it("should return a recharge by ID", async () => {
      const response = await rechargeResolver.Query.getRechargeById(null, {
        id: fakeMongoObjectId,
      });

      expect(response).toEqual(new ResponseRechargeDTO(fakeRecharge));
    });
  });

  describe("Mutation.createRecharge", () => {
    it("should create a new recharge", async () => {
      const response = await rechargeResolver.Mutation.createRecharge(null, {
        recharge: new RequestRechargeDTO(fakeRecharge),
      });

      expect(response).toEqual(new ResponseRechargeDTO(fakeRecharge));
    });

    it("should throw an error if endDate is not a valid date", async () => {
      const fakeRechargeWithInvalidDate = JSON.parse(
        JSON.stringify(fakeRequestRecharge)
      );
      fakeRechargeWithInvalidDate.endDate = "invalid_date";

      try {
        await rechargeResolver.Mutation.createRecharge(null, {
          recharge: fakeRechargeWithInvalidDate,
        });
      } catch (error) {
        const expectedError = {
          code: "invalid_date",
          received: "invalid_date",
          path: ["endDate"],
          message: "Expected date, received string",
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });
  });

  describe("Mutation.updateRecharge", () => {
    it("should update an existing recharge", async () => {
      const response = await rechargeResolver.Mutation.updateRecharge(null, {
        id: fakeMongoObjectId,
        recharge: new RequestRechargeDTO(fakeRecharge),
      });

      expect(response).toEqual(new ResponseRechargeDTO(fakeRecharge));
    });

    it("should throw an error if endDate is not a valid date", async () => {
      const fakeRechargeWithInvalidDate = JSON.parse(
        JSON.stringify(fakeRequestRecharge)
      );
      fakeRechargeWithInvalidDate.endDate = "invalid_date";

      try {
        await rechargeResolver.Mutation.updateRecharge(null, {
          id: fakeMongoObjectId,
          recharge: fakeRechargeWithInvalidDate,
        });
      } catch (error) {
        const expectedError = {
          code: "invalid_date",
          received: "invalid_date",
          path: ["endDate"],
          message: "Expected date, received string",
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });
  });

  describe("Mutation.deleteRecharge", () => {
    it("should delete an existing recharge", async () => {
      const response = await rechargeResolver.Mutation.deleteRecharge(null, {
        id: fakeMongoObjectId,
      });

      expect(response).toEqual(new ResponseRechargeDTO(fakeRecharge));
    });
  });
});
