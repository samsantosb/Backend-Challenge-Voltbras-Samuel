import { StationModel } from "../model/station.mongoose.model";
import { StationMongooseRepository } from "../repositories/station.mongoose.repository";
import { StationService } from "../services/station.service";
import { StationResolver } from "../resolvers/station.resolver";

function stationFactory() {
  const mongooseStationRepository = new StationMongooseRepository(StationModel);

  const stationService = new StationService(mongooseStationRepository);

  const { Query, Mutation } = new StationResolver(stationService);

  return { Query, Mutation, mongooseStationRepository, stationService };
}

export const stationModule = stationFactory();
