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
}
