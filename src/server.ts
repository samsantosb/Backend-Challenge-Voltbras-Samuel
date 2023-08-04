import { ApolloServer } from "apollo-server";
import { RechargeType } from "./graphQL/recharge.graphql";
import { ReservationType } from "./graphQL/reservation.graphql";
import { StationType } from "./graphQL/station.graphql";
import { HistoryStationType } from "./graphQL/station.history.graphql";
import { UserType } from "./graphQL/user.graphql";
import { AuthType } from "./graphQL/auth.graphql";
import { authModule } from "./modules/auth/factories/auth.factory";
import { rechargeModule } from "./modules/recharges/factories/recharge.factory";
import { reservationModule } from "./modules/reservations/factories/reservation.factory";
import { stationHistoryModule } from "./modules/stationHistory/factories/station.history.factory";
import { stationModule } from "./modules/stations/factories/station.factory";
import { userModule } from "./modules/users/factories/user.factory";
import { mongoConnect } from "./database/mongo.connect";

mongoConnect();
// Mesclar todos os tipos
const typeDefs = [
  UserType,
  StationType,
  ReservationType,
  RechargeType,
  HistoryStationType,
  AuthType,
];

// Resolvers
const resolvers = {
  Query: {
    ...userModule.Query,
    ...stationModule.Query,
    ...reservationModule.Query,
    ...rechargeModule.Query,
    ...stationHistoryModule.Query,
  },
  Mutation: {
    ...userModule.Mutation,
    ...stationModule.Mutation,
    ...reservationModule.Mutation,
    ...rechargeModule.Mutation,
    ...stationHistoryModule.Mutation,
    ...authModule.Mutation,
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
