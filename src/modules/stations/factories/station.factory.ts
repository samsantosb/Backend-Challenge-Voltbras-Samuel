import { StationModel } from "../repositories/model/station.mongoose.model";
import { StationMongooseRepository } from "../repositories/implementation/station.mongoose.repository";
import { StationService } from "../services/implementation/station.service";
import { StationResolver } from "../resolvers/implementation/station.resolver";

function stationFactory() {
  const mongooseRepository = new StationMongooseRepository(StationModel);
  const service = new StationService(mongooseRepository);
  const { Query, Mutation } = new StationResolver(service);

  return { Query, Mutation };
}

export const stationModule = stationFactory();
