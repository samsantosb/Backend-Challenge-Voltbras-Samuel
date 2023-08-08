import { connection, connections, connect } from "mongoose";

export function mongooseConnect(connectionString: string) {
  connection
    .on("error", (error) => {
      console.log("ERROR: Connection to MongoDB failed", error);
    })

    .once("open", () => {
      const infos = connections;

      infos.map((info) =>
        console.log(
          `Connected to ${info.host}:${info.port}/${info.name} mongo Database`
        )
      );
    });

  connect(connectionString);
  return connection.getClient().db();
}

export function mongoDisconnect() {
  connection.close();
}
