export abstract class IAuthService {
  abstract login(email: string, password: string): Promise<string>;
}
