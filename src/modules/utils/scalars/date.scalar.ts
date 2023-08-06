import { GraphQLScalarType, Kind } from "graphql";

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value: any) {
    return new Date(value); //client value
  },
  serialize(value: any) {
    return value instanceof Date ? value.toISOString() : null; //send value
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value); // valor do AST do cliente
    }
    return null;
  },
});
