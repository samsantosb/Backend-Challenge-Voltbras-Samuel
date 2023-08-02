import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeUser } from "../../__mocks__/fake.user";
import { fakeUserModel } from "../../__mocks__/fake.user.model";
import { UserMongooseRepository } from "../implementation/user.mongoose.repository";

const userRepository = new UserMongooseRepository(fakeUserModel);

describe("UserRepository", () => {
  describe("getAll", () => {
    it("should return all users", async () => {
      const users = await userRepository.getAll();

      expect(users).toEqual(Array.from({ length: 10 }, () => fakeUser));
    });
    it("should call, the find method of the userModel", async () => {
      await userRepository.getAll();

      expect(fakeUserModel.find).toHaveBeenCalled();
    });
  });
  describe("getById", () => {
    it("should return a user", async () => {
      const user = await userRepository.getById(fakeMongoObjectId);

      expect(user).toEqual(fakeUser);
    });
    it("should call, the findById method of the userModel", async () => {
      await userRepository.getById(fakeMongoObjectId);

      expect(fakeUserModel.findById).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      const invalidId = "invalidId";

      await expect(userRepository.getById(invalidId)).rejects.toThrow();
    });
  });
  describe("getByEmail", () => {
    it("should return a user", async () => {
      const user = await userRepository.getByEmail(fakeUser.email);

      expect(user).toEqual(fakeUser);
    });
    it("should call, the findOne method of the userModel", async () => {
      await userRepository.getByEmail(fakeUser.email);

      expect(fakeUserModel.findOne).toHaveBeenCalled();
    });
  });
  describe("create", () => {
    it("should return a user", async () => {
      const user = await userRepository.create(fakeUser);

      expect(user).toEqual(fakeUser);
    });
    it("should call, the create method of the userModel", async () => {
      await userRepository.create(fakeUser);

      expect(fakeUserModel.create).toHaveBeenCalled();
    });
  });
  describe("update", () => {
    it("should return a user", async () => {
      const user = await userRepository.update(fakeMongoObjectId, fakeUser);

      expect(user).toEqual(fakeUser);
    });
    it("should call, the findByIdAndUpdate method of the userModel", async () => {
      await userRepository.update(fakeMongoObjectId, fakeUser);

      expect(fakeUserModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      const invalidId = "invalidId";

      await expect(
        userRepository.update(invalidId, fakeUser)
      ).rejects.toThrow();
    });
  });
  describe("softDelete", () => {
    it("should return a user", async () => {
      const user = await userRepository.softDelete(fakeMongoObjectId);

      expect(user).toEqual(fakeUser);
    });
    it("should call, the findByIdAndUpdate method of the userModel", async () => {
      await userRepository.softDelete(fakeMongoObjectId);

      expect(fakeUserModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      const invalidId = "invalidId";

      await expect(userRepository.softDelete(invalidId)).rejects.toThrow();
    });
  });
});
