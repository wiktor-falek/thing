import express, { Request, Response } from "express";

const app = express();

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
