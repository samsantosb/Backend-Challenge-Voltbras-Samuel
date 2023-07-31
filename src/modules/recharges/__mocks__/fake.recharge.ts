import { faker } from "@faker-js/faker";
import { fakeUser } from "../../users/__mocks__/fake.user";
import { fakeStation } from "../../stations/__mocks__/fake.station";

const { Schema } = require("mongoose").Types;

const fakeMongoObjectIds = [
  "634c43c03c18f58508caf9fe",
  "634c43c03c18f58508caf9fc",
];

export const generateFakeRecharge = (deleted = false, progress = false) => {
  return {
    _id: fakeMongoObjectIds[0],
    station: fakeMongoObjectIds[0],
    user: fakeMongoObjectIds[0],
    inProgress: progress,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    endDate: progress ? null : faker.date.past(),
    deletedAt: deleted ? faker.date.past() : null,
  };
};

export const fakeRecharge = generateFakeRecharge();
