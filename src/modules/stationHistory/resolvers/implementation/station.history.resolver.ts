import { RequestStationHistoryDTO } from "./../../dtos/request.station.history.dto";
import { IStationHistoryService } from "./../../services/station.history.service.interface";
import { IStationHistoryResolver } from "./../station.history.resolver.interface";

export class StationHistoryResolver implements IStationHistoryResolver {
  constructor(private stationHistoryService: IStationHistoryService) {}

  public Query = {
    getAllStationHistories: async () => {
      const stationHistories = await this.stationHistoryService.getAll();

      return stationHistories;
    },
    getStationHistoryById: async (_: any, { id }: { id: string }) => {
      const stationHistory = await this.stationHistoryService.getById(id);

      return stationHistory;
    },
  };

  public Mutation = {
    createStationHistory: async (
      _: any,
      { stationHistory }: { stationHistory: RequestStationHistoryDTO }
    ) => {
      const request = new RequestStationHistoryDTO(stationHistory);

      const newStationHistory = await this.stationHistoryService.create(
        request
      );

      return newStationHistory;
    },
    updateStationHistory: async (
      _: any,
      {
        id,
        stationHistory,
      }: { id: string; stationHistory: RequestStationHistoryDTO }
    ) => {
      const request = new RequestStationHistoryDTO(stationHistory);

      const updatedStationHistory = await this.stationHistoryService.update(
        id,
        request
      );

      return updatedStationHistory;
    },
    deleteStationHistory: async (_: any, { id }: { id: string }) => {
      const deletedStationHistory = await this.stationHistoryService.softDelete(
        id
      );

      return deletedStationHistory;
    },
  };
}
