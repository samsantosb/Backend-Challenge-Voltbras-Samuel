export const installStationMutation = `
      mutation Mutation($station: StationInput) {
        installStation(station: $station) {
          _id
          createdAt
          updatedAt
          name
          planetName
          deletedAt
        }
      }
    `;

export const stationsQuery = `
  query Stations {
    stations {
      _id
      deletedAt
      createdAt
      name
      planetName
      updatedAt
    }
  }
`;

export const variables = {
  station: {
    planetName: "HD 110014 b",
    name: "Nebula",
  },
};
