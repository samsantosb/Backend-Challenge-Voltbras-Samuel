import { gql } from "apollo-server";

export const PlanetType = gql`
  type Planet {
    name: String
    mass: Float
    hasStation: Boolean
  }

  type Query {
    suitablePlanets: [Planet]
  }
`;
