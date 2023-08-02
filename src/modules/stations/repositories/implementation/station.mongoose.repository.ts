import { IStationRepository } from "../station.repository.interface";
import {
  mongooseStationModel,
  mongooseStationSchema,
} from "../model/station.mongoose.model";
import { StationMapper } from "../../mappers/station.mapper";
import { RequestStationDTO } from "../../dtos/request.station.dto";
import { Station } from "../../entities/station.entity";
import { isIdValid } from "../../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../../utils/errorHandler/error.messages";

export class StationMongooseRepository implements IStationRepository {
  constructor(private readonly stationModel: mongooseStationModel) {}

  async getAll(): Promise<Station[]> {
    const stations = (await this.populateStations(
      this.stationModel.find()
    )) as mongooseStationSchema[];

    const parsedStations: Station[] = stations.map(
      (station: mongooseStationSchema) => StationMapper.mongoToDomain(station)
    );

    return parsedStations;
  }

  async getById(id: string): Promise<Station> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const station = await this.populateStations(this.stationModel.findById(id));

    const parsedStation: Station = StationMapper.mongoToDomain(station);

    return parsedStation;
  }

  async getByPlanetName(planetName: string): Promise<Station> {
    const station = (await this.populateStations(
      this.stationModel.findOne({ planetName: planetName })
    )) as mongooseStationSchema;

    const parsedStation: Station = StationMapper.mongoToDomain(station);

    return parsedStation;
  }

  async create(station: RequestStationDTO): Promise<Station> {
    const newStation = (await this.stationModel.create(
      station
    )) as unknown as mongooseStationSchema;

    const parsedStation: Station = StationMapper.mongoToDomain(newStation);

    return parsedStation;
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

    const parsedStation: Station = StationMapper.mongoToDomain(updatedStation);

    return parsedStation;
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

    const parsedStation: Station = StationMapper.mongoToDomain(deletedStation);

    return parsedStation;
  }

  private populateStations(query: any): any {
    return query.populate(["Recharges", "Reservations", "Histories"]);
  }
}
