import { mongooseUserSchema } from "../model/user.mongoose.model";
import { User } from "../../../domain/entities/user.entity";

export class UserMapper {
  static mongoToDomain(user: mongooseUserSchema): User {
    const rawUser = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      recharges: user.recharges.map((recharge) => recharge.toString()),
      reservations: user.reservations.map((reservation) =>
        reservation.toString()
      ),
      stationHistories: user.stationHistories.map((stationHistory) =>
        stationHistory.toString()
      ),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };

    return rawUser;
  }
}
