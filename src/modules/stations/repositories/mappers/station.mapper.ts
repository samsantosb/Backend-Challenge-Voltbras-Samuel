import { mongooseStationSchema } from "../model/station.mongoose.model";
import { Station } from "../../entities/station.entity";

export class StationMapper {
  static mongoToDomain(station: mongooseStationSchema): Station {
    const rawStation = {
      _id: station._id.toString(),
      planetName: station.planetName?.toString(),
      recharges: station.recharges.map((recharge) => recharge.toString()),
      reservations: station.reservations.map((reservation) =>
        reservation.toString()
      ),
      histories: station.histories.map((history) => history.toString()),
      createdAt: station.createdAt,
      updatedAt: station.updatedAt,
      deletedAt: station.deletedAt,
    };

    return rawStation;
  }
}
