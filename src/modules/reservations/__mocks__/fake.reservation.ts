import { faker } from "@faker-js/faker";
import { fakeMongoObjectIds } from "../../stations/__mocks__/fake.station";

export const generateFakeReservation = () => ({
  _id: fakeMongoObjectIds[1],
  stationName: "AgathaVolt5",
  userEmail: faker.internet.email(),
  startDate: String(faker.date.future()),
  endDate: String(faker.date.future()),
});

export const fakeReservation = generateFakeReservation();
