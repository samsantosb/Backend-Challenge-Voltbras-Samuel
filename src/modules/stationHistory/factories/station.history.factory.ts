import { StationHistoryModel } from "../model/station.history.mongoose.model";
import { StationHistoryMongooseRepository } from "../repositories/station.history.mongoose.repository";
import { StationHistoryService } from "../services/station.history.service";
import { StationHistoryResolver } from "../resolvers/station.history.resolver";

function stationHistoryFactory() {
  const mongooseRepository = new StationHistoryMongooseRepository(
    StationHistoryModel
  );
  const service = new StationHistoryService(mongooseRepository);
  const { Query, Mutation } = new StationHistoryResolver(service);

  return { Query, Mutation };
}

export const stationHistoryModule = stationHistoryFactory();
