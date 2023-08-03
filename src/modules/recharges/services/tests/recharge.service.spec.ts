import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeRequestRecharge } from "../../__mocks__/fake.request.recharge";
import { fakeRecharge } from "../../__mocks__/fake.recharge";
import { fakeRechargeRepository } from "../../__mocks__/fake.recharge.repository";
import { RechargeService } from "../implementation/recharge.service";

const rechargeService = new RechargeService(fakeRechargeRepository);

describe("RechargeService", () => {
  describe("getAll", () => {
    it("should return all recharges", async () => {
      const recharges = await rechargeService.getAll();

      expect(recharges).toEqual(Array.from({ length: 10 }, () => fakeRecharge));
    });
    it("should throw an error if no recharges are found", async () => {
      jest
        .spyOn(fakeRechargeRepository, "getAll")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(rechargeService.getAll()).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return a recharge", async () => {
      const recharge = await rechargeService.getById(fakeMongoObjectId);

      expect(recharge).toEqual(fakeRecharge);
    });
    it("should throw an error if no recharge is found", async () => {
      jest
        .spyOn(fakeRechargeRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        rechargeService.getById(fakeMongoObjectId)
      ).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a recharge", async () => {
      const recharge = await rechargeService.create(fakeRequestRecharge);

      expect(recharge).toEqual(fakeRecharge);
    });
    it("should throw an error if the recharge cannot be created", async () => {
      jest
        .spyOn(fakeRechargeRepository, "create")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        rechargeService.create(fakeRequestRecharge)
      ).rejects.toThrow();
    });
  });

  describe("update", () => {
    it("should return a recharge", async () => {
      const recharge = await rechargeService.update(
        fakeMongoObjectId,
        fakeRequestRecharge
      );

      expect(recharge).toEqual(fakeRecharge);
    });
    it("should throw an error if the recharge cannot be updated", async () => {
      jest
        .spyOn(fakeRechargeRepository, "update")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        rechargeService.update(fakeMongoObjectId, fakeRequestRecharge)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a recharge", async () => {
      const recharge = await rechargeService.softDelete(fakeMongoObjectId);

      expect(recharge).toEqual(fakeRecharge);
    });
    it("should throw an error if the recharge cannot be deleted", async () => {
      jest
        .spyOn(fakeRechargeRepository, "softDelete")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        rechargeService.softDelete(fakeMongoObjectId)
      ).rejects.toThrow();
    });
  });
});
