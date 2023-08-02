import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeUser } from "../../__mocks__/fake.user";
import { fakeUserModel } from "../../__mocks__/fake.user.model";
import { fakeUserRepository } from "../../__mocks__/fake.user.repository";
import { UserService } from "../implementation/user.service";

const userService = new UserService(fakeUserRepository);

describe("UserService", () => {
  describe("getAll", () => {
    it("should return all users", async () => {
      const users = await userService.getAll();

      expect(users).toEqual(Array.from({ length: 10 }, () => fakeUser));
    });
    it("should throw an error if no users are found", async () => {
      jest
        .spyOn(fakeUserRepository, "getAll")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(userService.getAll()).rejects.toThrow();
    });
  });
  describe("getById", () => {
    it("should return a user", async () => {
      const user = await userService.getById(fakeMongoObjectId);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(userService.getById("invalidId")).rejects.toThrow();
    });
  });
  describe("getByEmail", () => {
    it("should return a user", async () => {
      const user = await userService.getByEmail(fakeUser.email);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if no user is found", async () => {
      jest
        .spyOn(fakeUserRepository, "getByEmail")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(userService.getByEmail(fakeUser.email)).rejects.toThrow();
    });
  });
  describe("create", () => {
    it("should return a user", async () => {
      const user = await userService.create(fakeUser);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if the user cannot be created", async () => {
      jest
        .spyOn(fakeUserRepository, "create")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(userService.create(fakeUser)).rejects.toThrow();
    });
  });
  describe("update", () => {
    it("should return a user", async () => {
      const user = await userService.update(fakeMongoObjectId, fakeUser);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(userService.update("invalidId", fakeUser)).rejects.toThrow();
    });
    it("should throw an error if the user cannot be updated", async () => {
      jest
        .spyOn(fakeUserRepository, "update")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        userService.update(fakeMongoObjectId, fakeUser)
      ).rejects.toThrow();
    });
  });
  describe("softDelete", () => {
    it("should return a user", async () => {
      const user = await userService.softDelete(fakeMongoObjectId);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(userService.softDelete("invalidId")).rejects.toThrow();
    });
    it("should throw an error if the user cannot be deleted", async () => {
      jest
        .spyOn(fakeUserRepository, "softDelete")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(userService.softDelete(fakeMongoObjectId)).rejects.toThrow();
    });
  });
});
