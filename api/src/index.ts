import express, { Request, Response } from "express";
import cors from "cors";
import cron from "node-cron";
import PoeNinjaStore from "./stores/PoeNinjaStore.js";

PoeNinjaStore.fetchAll()

const app = express();
app.use(cors());

app.get("/currency", async (req: Request, res: Response) => {
  const { currency } = PoeNinjaStore.data;
  if (currency == null) {
    return res
      .status(500)
      .json({ ok: false, message: "Missing data, try again later" });
  }
  res.send({ mirror: currency.lines[0], divine: currency.lines[8] });
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

  const clientId = Date.now();

  clients.push({
    id: clientId,
    response: res,
  });

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
