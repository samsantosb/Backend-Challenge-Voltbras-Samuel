import { fakeMongoObjectId } from "../../../../__mocks__/fake.mongo.ids";
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
  describe("createReservation", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationRepository.create(fakeReservation);

      expect(reservation).toEqual(fakeReservation);
    });
    it("should call the create method of the reservationModel", async () => {
      await reservationRepository.create(fakeReservation);

      expect(fakeReservationModel.create).toHaveBeenCalled();
    });
  });
  describe("update", () => {
    it("should return a reservation", async () => {
      const reservation = await reservationRepository.update(
        fakeMongoObjectId,
        fakeReservation
      );

      expect(reservation).toEqual(fakeReservation);
    });
    it("should call the findByIdAndUpdate method of the reservationModel", async () => {
      await reservationRepository.update(fakeMongoObjectId, fakeReservation);

      expect(fakeReservationModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      const invalidId = "invalidId";

      await expect(
        reservationRepository.update(invalidId, fakeReservation)
      ).rejects.toThrow();
    });
  });
});
