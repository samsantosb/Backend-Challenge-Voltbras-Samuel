import { faker } from "@faker-js/faker";
const fakeMongoObjectIds = [
  "634c43c03c18f58508caf9fe",
  "634c43c03c18f58508caf9fc",
];

export const generateFakeRecharge = (deleted = false, progress = false) => {
  return {
    _id: fakeMongoObjectIds[0],
    stationId: fakeMongoObjectIds[0],
    userId: fakeMongoObjectIds[0],
    startDate: String(faker.date.past()),
    endDate: String(faker.date.past()),
  };
};

export const fakeRecharge = generateFakeRecharge();
