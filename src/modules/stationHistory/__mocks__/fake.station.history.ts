import { faker } from "@faker-js/faker";

export const fakeMongoObjectIds = [
  "634c43c03c18f58508caf9fe",
  "634c43c03c18f58508caf9fc",
];

const generateFakeStationHistory = (deleted = false) => {
  return {
    _id: fakeMongoObjectIds[0],
    station: fakeMongoObjectIds[0],
    user: fakeMongoObjectIds[0],
    rechargeTime: faker.date.past(),
    duration: faker.number.int(),
    deletedAt: deleted ? faker.date.past() : undefined,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
};

export const fakeStationHistory = generateFakeStationHistory();
