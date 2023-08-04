export abstract class IAuthResolver {
  abstract Mutation: {
    login: (
      parent: any,
      args: { email: string; password: string }
    ) => Promise<{ token: string }>;
  };
}
