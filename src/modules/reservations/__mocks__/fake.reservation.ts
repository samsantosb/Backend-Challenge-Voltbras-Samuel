import { faker } from "@faker-js/faker";
import { generateFakeUser } from "../../users/__mocks__/fake.user";
import { generateFakeStation } from "../../stations/__mocks__/fake.station";

export const fakeMongoObjectIds = [
  "634c43c03c18f58508caf9fe",
  "634c43c03c18f58508caf9fc",
];

export const generateFakeReservation = (deleted = false, progress = false) => {
  return {
    _id: fakeMongoObjectIds[0],
    station: fakeMongoObjectIds[0],
    user: fakeMongoObjectIds[0],
    startTime: String(faker.date.past()),
    endTime: String(faker.date.past()),
    inProgress: progress,
    deletedAt: deleted ? String(faker.date.past()) : undefined,
    createdAt: String(faker.date.past()),
    updatedAt: String(faker.date.past()),
  };
};

export const fakeReservation = generateFakeReservation();
