import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { RechargeType } from "./graphQL/recharge.graphql";
import { StationType } from "./graphQL/station.graphql";
import { UserType } from "./graphQL/user.graphql";
import { AuthType } from "./graphQL/auth.graphql";
import { PlanetType } from "./graphQL/planets.graphql";
import { planetModule } from "./modules/planets/factories/planet.factory";
import { authModule } from "./modules/auth/factories/auth.factory";
import { rechargeModule } from "./modules/recharges/factories/recharge.factory";
import { stationModule } from "./modules/stations/factories/station.factory";
import { userModule } from "./modules/users/factories/user.factory";
import { mongooseConnect } from "./database/mongose.connect";
import { allow, shield } from "graphql-shield";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateScalar } from "./modules/utils/scalars/date.scalar";
import { reservationModule } from "./modules/reservations/factories/reservation.factory";
import { ReservationType } from "./graphQL/reservation.graphql";

const mongo: string = process.env.DATABASE_URL || "";

mongooseConnect(mongo);

rechargeModule.rechargeAgendaService.startRechargeChecking();

const typeDefs = [
  UserType,
  StationType,
  RechargeType,
  AuthType,
  PlanetType,
  ReservationType,
];

const resolvers = {
  Date: DateScalar,
  Query: {
    ...userModule.Query,
    ...stationModule.Query,
    ...rechargeModule.Query,
    ...planetModule.Query,
    ...reservationModule.Query,
  },
  Mutation: {
    ...userModule.Mutation,
    ...stationModule.Mutation,
    ...rechargeModule.Mutation,
    ...authModule.Mutation,
    ...reservationModule.Mutation,
  },
};

const permissions = shield(
  {
    Query: {
      "*": authModule.authService.authenticationMiddleware(),
    },
    Mutation: {
      "*": authModule.authService.authenticationMiddleware(),
      login: allow,
      createUser: allow,
    },
  },
  {
    debug: true,
  }
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithMiddleware = applyMiddleware(schema, permissions);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }) => ({ req }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
