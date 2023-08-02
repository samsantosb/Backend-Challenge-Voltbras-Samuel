import { faker } from "@faker-js/faker";
export const fakeMongoObjectIds = [
  "634c43c03c18f58508caf9fe",
  "634c43c03c18f58508caf9fc",
];

export const generateFakeStation = (deleted = false) => {
  return {
    _id: fakeMongoObjectIds[0],
    planetName: "Earth",
    recharges: fakeMongoObjectIds,
    reservations: fakeMongoObjectIds,
    histories: fakeMongoObjectIds,
    deletedAt: deleted ? faker.date.past() : undefined,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
};

export const fakeStation = generateFakeStation();
