import { faker } from "@faker-js/faker";
import { fakeMongoObjectIds } from "../../stations/__mocks__/fake.station";

export const generateFakeReservation = () => ({
  _id: fakeMongoObjectIds[1],
  stationName: "AgathaVolt5",
  userEmail: faker.internet.email(),
  startDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
  endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4),
});

export const fakeReservationWithTimeThatmatches = {
  _id: fakeMongoObjectIds[2],
  stationName: "AgathaVolt5",
  userEmail: faker.internet.email(),
  startDate: new Date(),
  endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 1),
};

export const fakeReservation = generateFakeReservation();
