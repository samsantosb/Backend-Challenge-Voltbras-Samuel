import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
import { fakeRequestReservation } from "../../__mocks__/fake.request.reservation";
import { fakeReservation } from "../../__mocks__/fake.reservation";
import { fakeReservationModel } from "../../__mocks__/fake.reservation.model";
import { ReservationMongooseRepository } from "../reservation.mongoose.repository";

const reservationRepository = new ReservationMongooseRepository(
  fakeReservationModel
);

describe("ReservationRepository", () => {
  describe("getAll", () => {
    it("should return all reservations", async () => {
      const reservations = await reservationRepository.getAll();

      expect(reservations).toEqual(
        Array.from({ length: 10 }, () => fakeReservation)
      );
    });
    it("should call the find method of the reservationModel", async () => {
      await reservationRepository.getAll();

      expect(fakeReservationModel.find).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationRepository.getById(
        fakeMongoObjectId
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should call the findById method of the reservationModel", async () => {
      await reservationRepository.getById(fakeMongoObjectId);

      expect(fakeReservationModel.findById).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(
        reservationRepository.getById("invalidId")
      ).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationRepository.create(
        fakeRequestReservation
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should call the create method of the reservationModel", async () => {
      await reservationRepository.create(fakeRequestReservation);

      expect(fakeReservationModel.create).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationRepository.update(
        fakeMongoObjectId,
        fakeRequestReservation
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should call the findByIdAndUpdate method of the reservationModel", async () => {
      await reservationRepository.update(
        fakeMongoObjectId,
        fakeRequestReservation
      );

      expect(fakeReservationModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(
        reservationRepository.update("invalidId", fakeRequestReservation)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationRepository.softDelete(
        fakeMongoObjectId
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should call the findByIdAndUpdate method of the reservationModel", async () => {
      await reservationRepository.softDelete(fakeMongoObjectId);

      expect(fakeReservationModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      await expect(
        reservationRepository.softDelete("invalidId")
      ).rejects.toThrow();
    });
  });
});
