import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";

import { StationType } from "../graphQL/station.graphql";

import { stationModule } from "../modules/stations/factories/station.factory";
import { mongoDisconnect, mongooseConnect } from "../database/mongose.connect";
import {
  installStationMutation,
  stationsQuery,
  variables,
} from "./__mocks__/fake.station.e2e";
import { StationModel } from "../modules/stations/model/station.mongoose.model";

const mongo: string = process.env.DATABASE_URL || "";

mongooseConnect(mongo);

const typeDefs = [StationType];

const resolvers = {
  Query: {
    ...stationModule.Query,
  },
  Mutation: {
    ...stationModule.Mutation,
  },
};

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});

beforeAll(async () => {
  await StationModel.deleteMany({}).exec();
});

describe("Station", () => {
  it("installStations", async () => {
    const response = await testServer.executeOperation({
      query: installStationMutation,
      variables,
    });

    expect(response.data).toHaveProperty("installStation");
    expect(response?.data?.installStation).toHaveProperty("_id");
    expect(response?.data?.installStation).toHaveProperty("createdAt");
    expect(response?.data?.installStation).toHaveProperty("updatedAt");
    expect(response?.data?.installStation).toHaveProperty("name");
    expect(response?.data?.installStation).toHaveProperty("planetName");
    expect(response?.data?.installStation.name).toBe(variables.station.name);
    expect(response?.data?.installStation.planetName).toBe(
      variables.station.planetName
    );
  });

  it("Stations", async () => {
    const response = await testServer.executeOperation({
      query: stationsQuery,
    });

    expect(response.data).toHaveProperty("stations");
    expect(response?.data?.stations[0]).toHaveProperty("_id");
    expect(response?.data?.stations[0]).toHaveProperty("createdAt");
    expect(response?.data?.stations[0]).toHaveProperty("updatedAt");
    expect(response?.data?.stations[0]).toHaveProperty("name");
    expect(response?.data?.stations[0]).toHaveProperty("planetName");
    expect(response?.data?.stations[0].name).toBe(variables.station.name);
    expect(response?.data?.stations[0].planetName).toBe(
      variables.station.planetName
    );
  });
});

afterAll(async () => {
  testServer.stop();
  mongoDisconnect();
});
