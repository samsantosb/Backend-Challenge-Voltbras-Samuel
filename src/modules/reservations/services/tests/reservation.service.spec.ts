import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeRequestReservation } from "../../__mocks__/fake.request.reservation";
import { fakeReservation } from "../../__mocks__/fake.reservation";
import { fakeReservationRepository } from "../../__mocks__/fake.reservation.repository";
import { ReservationService } from "../implementation/reservation.service";

const reservationService = new ReservationService(fakeReservationRepository);

describe("ReservationService", () => {
  describe("getAll", () => {
    it("should return all reservations", async () => {
      const reservations = await reservationService.getAll();

      expect(reservations).toEqual(
        Array.from({ length: 10 }, () => fakeReservation)
      );
    });
    it("should throw an error if no reservations are found", async () => {
      jest
        .spyOn(fakeReservationRepository, "getAll")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(reservationService.getAll()).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationService.getById(fakeMongoObjectId);

      expect(reservation).toEqual(fakeReservation);
    });
    it("should throw an error if no reservation is found", async () => {
      jest
        .spyOn(fakeReservationRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        reservationService.getById(fakeMongoObjectId)
      ).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationService.create(
        fakeRequestReservation
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should throw an error if the reservation cannot be created", async () => {
      jest
        .spyOn(fakeReservationRepository, "create")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        reservationService.create(fakeRequestReservation)
      ).rejects.toThrow();
    });
  });

  describe("update", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationService.update(
        fakeMongoObjectId,
        fakeRequestReservation
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should throw an error if the reservation cannot be updated", async () => {
      jest
        .spyOn(fakeReservationRepository, "update")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        reservationService.update(fakeMongoObjectId, fakeRequestReservation)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationService.softDelete(
        fakeMongoObjectId
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should throw an error if the reservation cannot be deleted", async () => {
      jest
        .spyOn(fakeReservationRepository, "softDelete")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        reservationService.softDelete(fakeMongoObjectId)
      ).rejects.toThrow();
    });
  });
});
