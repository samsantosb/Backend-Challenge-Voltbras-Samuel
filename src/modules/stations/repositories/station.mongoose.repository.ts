import { IStationRepository } from "./station.repository.interface";
import {
  mongooseStationModel,
  mongooseStationSchema,
} from "../model/station.mongoose.model";
import { RequestStationDTO } from "../dtos/request.station.dto";
import { Station } from "../model/station.type";
import { isIdValid } from "../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";

export class StationMongooseRepository implements IStationRepository {
  constructor(private readonly stationModel: mongooseStationModel) {}

  async getAll(): Promise<Station[]> {
    const stations = (await this.stationModel.find()) as Station[];

    return stations;
  }

  async getByName(name: string): Promise<Station> {
    const station = (await this.stationModel.findOne({
      name: name,
    })) as Station;

    return station;
  }

  async getByPlanetName(planetName: string): Promise<Station> {
    const station = (await this.stationModel.findOne({
      planetName: planetName,
    })) as Station;

    return station;
  }

  async create(station: RequestStationDTO): Promise<Station> {
    const newStation = await this.stationModel.create(station);

    return newStation;
  }

  async update(id: string, station: RequestStationDTO): Promise<Station> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedStation = (await this.stationModel.findByIdAndUpdate(
      id,
      station,
      {
        new: true,
      }
    )) as mongooseStationSchema;

    return updatedStation;
  }

  async softDelete(id: string): Promise<Station> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const deletedStation = (await this.stationModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    )) as mongooseStationSchema;

    return deletedStation;
  }
}
