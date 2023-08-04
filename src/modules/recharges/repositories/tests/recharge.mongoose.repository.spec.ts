import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeRequestRecharge } from "../../__mocks__/fake.request.recharge";
import { fakeRecharge } from "../../__mocks__/fake.recharge";
import { fakeRechargeModel } from "../../__mocks__/fake.recharge.model";
import { RechargeMongooseRepository } from "../recharge.mongoose.repository";

const rechargeRepository = new RechargeMongooseRepository(fakeRechargeModel);

describe("RechargeRepository", () => {
  describe("getAll", () => {
    it("should return all recharges", async () => {
      const recharges = await rechargeRepository.getAll();

      expect(recharges).toEqual(Array.from({ length: 10 }, () => fakeRecharge));
    });
    it("should call the find method of the rechargeModel", async () => {
      await rechargeRepository.getAll();

      expect(fakeRechargeModel.find).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a recharge", async () => {
      const recharge = await rechargeRepository.getById(fakeMongoObjectId);

      expect(recharge).toEqual(fakeRecharge);
    });
    it("should call the findById method of the rechargeModel", async () => {
      await rechargeRepository.getById(fakeMongoObjectId);

      expect(fakeRechargeModel.findById).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(rechargeRepository.getById("invalidId")).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a recharge", async () => {
      const recharge = await rechargeRepository.create(fakeRequestRecharge);

      expect(recharge).toEqual(fakeRecharge);
    });
    it("should call the create method of the rechargeModel", async () => {
      await rechargeRepository.create(fakeRequestRecharge);

      expect(fakeRechargeModel.create).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should return a recharge", async () => {
      const recharge = await rechargeRepository.update(
        fakeMongoObjectId,
        fakeRequestRecharge
      );

      expect(recharge).toEqual(fakeRecharge);
    });
    it("should call the findByIdAndUpdate method of the rechargeModel", async () => {
      await rechargeRepository.update(fakeMongoObjectId, fakeRequestRecharge);

      expect(fakeRechargeModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(
        rechargeRepository.update("invalidId", fakeRequestRecharge)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a recharge", async () => {
      const recharge = await rechargeRepository.softDelete(fakeMongoObjectId);

      expect(recharge).toEqual(fakeRecharge);
    });
    it("should call the findByIdAndUpdate method of the rechargeModel", async () => {
      await rechargeRepository.softDelete(fakeMongoObjectId);

      expect(fakeRechargeModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(
        rechargeRepository.softDelete("invalidId")
      ).rejects.toThrow();
    });
  });
});
