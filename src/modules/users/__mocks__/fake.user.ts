import { faker } from "@faker-js/faker";

export const fakeMongoObjectIds = [
  "634c43c03c18f58508caf9fe",
  "634c43c03c18f58508caf9fc",
];

export const generateFakeUser = (deleted = false, populate = false) => ({
  _id: fakeMongoObjectIds[0],
  name: `${faker.person.prefix()} ${faker.person.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password(),
  recharges: fakeMongoObjectIds,
  reservations: fakeMongoObjectIds,
  stationHistories: fakeMongoObjectIds,
  deletedAt: deleted ? faker.date.past() : null,
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
});

export const fakeUser = generateFakeUser();
