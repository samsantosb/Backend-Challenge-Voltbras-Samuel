import { faker } from "@faker-js/faker";
const fakeMongoObjectIds = [
  "634c43c03c18f58508caf9fe",
  "634c43c03c18f58508caf9fc",
];

export const generateFakeRecharge = (deleted = false, progress = false) => {
  return {
    _id: fakeMongoObjectIds[0],
    stationName: "NebulaVolt15",
    userEmail: "samsan@hotmail.com",
    startDate: String(faker.date.past()),
    endDate: String(faker.date.past()),
    inProgress: false,
  };
};

export const fakeRecharge = generateFakeRecharge();
