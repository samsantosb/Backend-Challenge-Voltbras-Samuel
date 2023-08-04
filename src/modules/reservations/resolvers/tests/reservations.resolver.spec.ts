import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeReservation } from "../../__mocks__/fake.reservation";
import { fakeReservationService } from "../../__mocks__/fake.reservation.service";
import { ReservationResolver } from "../reservation.resolver";
import { RequestReservationDTO } from "../../dtos/request.reservation.dto";
import { fakeRequestReservation } from "../../__mocks__/fake.request.reservation";

const reservationResolver = new ReservationResolver(fakeReservationService);

describe("ReservationResolver", () => {
  describe("Query.getAllReservations", () => {
    it("should return all reservations", async () => {
      const response = await reservationResolver.Query.getAllReservations();

      expect(response).toEqual(
        Array.from({ length: 10 }, () => fakeReservation)
      );
    });
  });

  describe("Query.getReservationById", () => {
    it("should return a reservation by ID", async () => {
      const response = await reservationResolver.Query.getReservationById(
        null,
        {
          id: fakeMongoObjectId,
        }
      );

      expect(response).toEqual(fakeReservation);
    });
  });

  describe("Mutation.createReservation", () => {
    it("should create a new reservation", async () => {
      const response = await reservationResolver.Mutation.createReservation(
        null,
        {
          reservation: new RequestReservationDTO(fakeReservation),
        }
      );

      expect(response).toEqual(fakeReservation);
    });

    it("should throw an error if startTime is not a valid date", async () => {
      const fakeReservationWithInvalidDate = JSON.parse(
        JSON.stringify(fakeRequestReservation)
      );
      fakeReservationWithInvalidDate.startTime = "invalid_date";

      try {
        await reservationResolver.Mutation.createReservation(null, {
          reservation: fakeReservationWithInvalidDate,
        });
      } catch (error) {
        const expectedError = {
          code: "invalid_date",
          received: "invalid_date",
          path: ["startTime"],
          message: "Expected date, received string",
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });
  });

  describe("Mutation.updateReservation", () => {
    it("should update an existing reservation", async () => {
      const response = await reservationResolver.Mutation.updateReservation(
        null,
        {
          id: fakeMongoObjectId,
          reservation: new RequestReservationDTO(fakeReservation),
        }
      );

      expect(response).toEqual(fakeReservation);
    });

    it("should throw an error if startTime is not a valid date", async () => {
      const fakeReservationWithInvalidDate = JSON.parse(
        JSON.stringify(fakeRequestReservation)
      );
      fakeReservationWithInvalidDate.startTime = "invalid_date";

      try {
        await reservationResolver.Mutation.updateReservation(null, {
          id: fakeMongoObjectId,
          reservation: fakeReservationWithInvalidDate,
        });
      } catch (error) {
        const expectedError = {
          code: "invalid_date",
          received: "invalid_date",
          path: ["startTime"],
          message: "Expected date, received string",
        };
        expect((error as any).message).toContain(expectedError.message);
      }
    });
  });

  describe("Mutation.deleteReservation", () => {
    it("should delete an existing reservation", async () => {
      const response = await reservationResolver.Mutation.deleteReservation(
        null,
        {
          id: fakeMongoObjectId,
        }
      );

      expect(response).toEqual(fakeReservation);
    });
  });
});
