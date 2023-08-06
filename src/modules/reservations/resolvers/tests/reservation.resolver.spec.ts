import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeReservation } from "../../__mocks__/fake.reservation";
import { fakeReservationService } from "../../__mocks__/fake.reservation.service";
import { ReservationResolver } from "../reservation.resolver";
import { RequestReservationDTO } from "../../dtos/request.reservation.dto";

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

  describe("Mutation.createReservation", () => {
    it("should create a new reservation", async () => {
      const response = await reservationResolver.Mutation.reservation(null, {
        reservation: new RequestReservationDTO(fakeReservation),
      });

      expect(response).toEqual(fakeReservation);
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
  });
});
