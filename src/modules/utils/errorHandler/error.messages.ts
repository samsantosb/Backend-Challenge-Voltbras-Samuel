export class ErrorMessages {
  static NOT_FOUND(entity: string) {
    return `${entity} not found`;
  }

  static ALREADY_EXISTS(entity: string) {
    return `${entity} already exists in the database`;
  }

  static CANNOT_CREATE(entity: string) {
    return `${entity} cannot be created`;
  }

  static CANNOT_UPDATE(entity: string) {
    return `${entity} cannot be updated`;
  }

  static CANNOT_DELETE(entity: string) {
    return `${entity} cannot be deleted`;
  }

  static INVALID_ID(entity: string) {
    return `${entity} id is invalid`;
  }

  static FORBIDDEN = "Forbidden";

  static UNAUTHORIZED = "Unauthorized";

  static UNEXPECTED_ERROR = "Unexpected error";

  static INVALID_CREDENTIALS = "Invalid credentials";

  static NO_PLANETS_FOUND = "No planets found";

  static STATION_SERVICE_IS_BUSY =
    "Current Station is already in recharge process or reservated, please wait";

  static USER_IS_BUSY = "Current User is doing a recharge, please wait";

  static INCORRECT_TIME_FOR_RECHARGE =
    "It is not the correct time for this reservated recharge";

  static USER_HAS_NO_RESERVATION =
    "The provided user doesnt have any reservation";

  static USER_IS_LATE = "The user is late for the recharge";

  static INVALID_DATE = "The provided date is invalid";
}
