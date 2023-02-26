import express, { Request, Response } from "express";
import cors from "cors";
import cron from "node-cron";

const app = express();

app.use(cors());

// TODO #2: encapsulate inside a class that will store and load the data
const currentLeague = "Sanctum";
const currencyOverviewType = "Currency";
const resource = `https://poe.ninja/api/data/currencyoverview?league=${currentLeague}&type=${currencyOverviewType}`;

let currencyData: any;

const fetchResource = async () => {
  const result = await fetch(resource, { method: "GET" });
  const data = await result.json();
  return data;
};

(async () => {
  currencyData = await fetchResource();
})();

app.get("/currency", async (req: Request, res: Response) => {
  if (currencyData == null) {
    return res.status(500).json({ ok: false, message: "Shit hit the fan" });
  }
  res.send({ mirror: currencyData.lines[0], divine: currencyData.lines[8] });
});

interface Client {
  id: number;
  response: Response;
}
let clients: Array<Client> = [];
app.get("/events", function eventsHandler(req, res) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  res.write(`data: hello\n\n`);

  const clientId = Date.now();

  const newClient: Client = {
    id: clientId,
    response: res,
  };

  clients.push(newClient);

  console.log(`${clientId} Connection open`);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

cron.schedule("*/1 * * * *", () => {
  // check if data updated
  const updated = false;
  if (updated) {
    console.log("Data updated");
  }
  // fetch the data and update if success
  // emit updated data (or the endpoint and have the client fetch it?) to each client
  for (const client of clients) {
    // const data = JSON.stringify()
    // client.response.write("data: " + data + "\n\n");
  }
});
