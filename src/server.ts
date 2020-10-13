import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.json({ mesage: "Ola mundo" });
});

app.listen(3333, () => {
  console.log("Online in http://localhost:3333/");
});
