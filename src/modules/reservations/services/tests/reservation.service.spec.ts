import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeRechargeService } from "../../../recharges/__mocks__/fake.recharge.service";
import { fakeReservation } from "../../__mocks__/fake.reservation";
import { fakeReservationRepository } from "../../__mocks__/fake.reservation.repository";
import { ReservationService } from "../reservation.service";

const reservationService = new ReservationService(
  fakeReservationRepository,
  fakeRechargeService
);

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
        .mockImplementationOnce(() => Promise.resolve(undefined) as any);

      await expect(reservationService.getAll()).rejects.toThrow();
    });
  });
  describe("createReservation", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationService.createReservation(
        fakeReservation
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should throw an error if the reservation cannot be created", async () => {
      jest
        .spyOn(fakeReservationRepository, "createReservation")
        .mockImplementationOnce(() => Promise.resolve(undefined) as any);

      await expect(
        reservationService.createReservation(fakeReservation)
      ).rejects.toThrow();
    });
  });
  describe("update", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationService.update(
        fakeMongoObjectId,
        fakeReservation
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should throw an error if the reservation cannot be updated", async () => {
      jest
        .spyOn(fakeReservationRepository, "update")
        .mockImplementationOnce(() => Promise.resolve(undefined) as any);

      await expect(
        reservationService.update(fakeMongoObjectId, fakeReservation)
      ).rejects.toThrow();
    });
  });
  // You may include other tests for methods in your ReservationService here
});
