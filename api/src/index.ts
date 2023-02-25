import express, { Request, Response } from "express";

const app = express();

app.get("/test", (req: Request, res: Response) => {
  res.send({ ok: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
