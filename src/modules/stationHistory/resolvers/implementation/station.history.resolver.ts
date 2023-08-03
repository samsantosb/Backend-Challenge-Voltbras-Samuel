import { RequestStationHistoryDTO } from "./../../dtos/request.station.history.dto";
import { ResponseStationHistoryDTO } from "./../../dtos/response.station.history.dto";
import { IStationHistoryService } from "./../../services/station.history.service.interface";
import { IStationHistoryResolver } from "./../station.history.resolver.interface";

export class StationHistoryResolver implements IStationHistoryResolver {
  constructor(private stationHistoryService: IStationHistoryService) {}

  public Query = {
    getAllStationHistories: async () => {
      const stationHistories = await this.stationHistoryService.getAll();

      const response = stationHistories.map(
        (stationHistory) => new ResponseStationHistoryDTO(stationHistory)
      );

      return response;
    },
    getStationHistoryById: async (_: any, { id }: { id: string }) => {
      const stationHistory = await this.stationHistoryService.getById(id);

      const response = new ResponseStationHistoryDTO(stationHistory);

      return response;
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

      const response = new ResponseStationHistoryDTO(newStationHistory);

      return response;
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

      const response = new ResponseStationHistoryDTO(updatedStationHistory);

      return response;
    },
    deleteStationHistory: async (_: any, { id }: { id: string }) => {
      const deletedStationHistory = await this.stationHistoryService.softDelete(
        id
      );

      const response = new ResponseStationHistoryDTO(deletedStationHistory);

      return response;
    },
  };
}
