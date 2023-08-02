import { fakeMongoObjectId } from "../../../../../__mocks__/fake.mongo.ids";
import { fakeUser } from "../../../__mocks__/fake.user";
import { fakeUserService } from "../../../__mocks__/fake.user.service";
import { UserResolver } from "../implementation/user.resolver";
import { RequestUserDTO } from "../dtos/request.user.dto";
import { ResponseUserDTO } from "../dtos/response.user.dto";
import { fakeRequestUser } from "../../../__mocks__/fake.request.user";

const userResolver = new UserResolver(fakeUserService);

describe("UserResolver", () => {
  describe("Query.getAllUsers", () => {
    it("should return all users", async () => {
      const response = await userResolver.Query.getAllUsers();

      expect(response).toEqual(
        Array.from({ length: 10 }, () => new ResponseUserDTO(fakeUser))
      );
    });
  });

  describe("Query.getUserById", () => {
    it("should return a user by ID", async () => {
      const response = await userResolver.Query.getUserById(null, {
        id: fakeMongoObjectId,
      });

      expect(response).toEqual(new ResponseUserDTO(fakeUser));
    });
  });

  describe("Query.getUserByEmail", () => {
    it("should return a user by email", async () => {
      const response = await userResolver.Query.getUserByEmail(null, {
        email: fakeUser.email,
      });

      expect(response).toEqual(new ResponseUserDTO(fakeUser));
    });
  });

  describe("Mutation.createUser", () => {
    it("should create a new user", async () => {
      const response = await userResolver.Mutation.createUser(null, {
        user: new RequestUserDTO(fakeUser),
      });

      expect(response).toEqual(new ResponseUserDTO(fakeUser));
    });

    it("should throw an error if email is invalid", async () => {});

    it("should throw an error if password is too short", async () => {});

    it("should throw an error if name is a number", async () => {});
  });

  describe("Mutation.updateUser", () => {
    it("should update an existing user", async () => {
      const response = await userResolver.Mutation.updateUser(null, {
        id: fakeMongoObjectId,
        user: new RequestUserDTO(fakeUser),
      });

      expect(response).toEqual(new ResponseUserDTO(fakeUser));
    });

    it("should throw an error if email is invalid", async () => {
      const fakeUserWithInvalidEmail = JSON.parse(
        JSON.stringify(fakeRequestUser)
      );
      fakeUserWithInvalidEmail.email = "invalidEmail";

      try {
        await userResolver.Mutation.updateUser(null, {
          id: fakeMongoObjectId,
          user: fakeUserWithInvalidEmail,
        });
      } catch (error) {
        const expectedError = {
          validation: "email",
          code: "invalid_string",
          message: "Invalid email",
          path: ["email"],
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });

    it("should throw an error if password is too short", async () => {
      const fakeUserWithShortPassword = JSON.parse(
        JSON.stringify(fakeRequestUser)
      );
      fakeUserWithShortPassword.password = "short";

      try {
        await userResolver.Mutation.updateUser(null, {
          id: fakeMongoObjectId,
          user: fakeUserWithShortPassword,
        });
      } catch (error) {
        const expectedError = {
          code: "too_small",
          minimum: 8,
          type: "string",
          inclusive: true,
          exact: false,
          message: "String must contain at least 8 character(s)",
          path: ["password"],
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });

    it("should throw an error if name is a number", async () => {
      const fakeUserWithNumberName = JSON.parse(
        JSON.stringify(fakeRequestUser)
      );
      fakeUserWithNumberName.name = 123;

      try {
        await userResolver.Mutation.updateUser(null, {
          id: fakeMongoObjectId,
          user: fakeUserWithNumberName,
        });
      } catch (error) {
        const expectedError = {
          code: "invalid_type",
          expected: "string",
          received: "number",
          path: ["name"],
          message: "Expected string, received number",
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });
  });

  describe("Mutation.deleteUser", () => {
    it("should delete an existing user", async () => {
      const response = await userResolver.Mutation.deleteUser(null, {
        id: fakeMongoObjectId,
      });

      expect(response).toEqual(new ResponseUserDTO(fakeUser));
    });
  });
});
