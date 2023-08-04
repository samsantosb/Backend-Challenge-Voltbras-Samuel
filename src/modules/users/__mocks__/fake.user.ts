import { faker } from "@faker-js/faker";
import { fakeMongoObjectIds } from "../../stations/__mocks__/fake.station";
import { ObjectId } from "mongoose";

export const generateFakeUser = () => ({
  _id: fakeMongoObjectIds[0],
  name: `${faker.person.prefix()} ${faker.person.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password(),
  recharges: fakeMongoObjectIds,
  reservations: fakeMongoObjectIds,
  stationHistories: fakeMongoObjectIds,
  deletedAt: String(faker.date.past()),
  createdAt: String(faker.date.past()),
  updatedAt: String(faker.date.past()),
});

export const fakeUser = generateFakeUser();
