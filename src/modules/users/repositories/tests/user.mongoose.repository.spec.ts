import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeUser } from "../../__mocks__/fake.user";
import { fakeUserModel } from "../../__mocks__/fake.user.model";
import { UserMongooseRepository } from "../user.mongoose.repository";

const userRepository = new UserMongooseRepository(fakeUserModel);

describe("UserRepository", () => {
  describe("getAll", () => {
    it("should return all users", async () => {
      const users = await userRepository.getAll();

      expect(users).toEqual(Array.from({ length: 10 }, () => fakeUser));
    });
  });
  describe("getByEmail", () => {
    it("should return a user", async () => {
      const user = await userRepository.getByEmail(fakeUser.email);

      expect(user).toEqual(fakeUser);
    });
  });
  describe("create", () => {
    it("should return a user", async () => {
      const user = await userRepository.create(fakeUser);

      expect(user).toEqual(fakeUser);
    });
  });
  describe("update", () => {
    it("should return a user", async () => {
      const user = await userRepository.update(fakeMongoObjectId, fakeUser);

      expect(user).toEqual(fakeUser);
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
