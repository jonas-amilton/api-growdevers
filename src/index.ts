import express, { Response, Request } from "express";
import { Growdever } from "./models/growdever";
import { growdevers } from "./database/growdevers";

const app = express();
app.use(express.json());

app.listen(3333, () => {
  console.log("api is running");
});

app.get("/growdever", (req: Request, res: Response) => {
  try {
    const { idade } = req.query;

    let result = growdevers;

    if (idade) {
      result = growdevers.filter(
        (growdever) => growdever.idade === Number(idade)
      );
    }

    return res.status(200).send({
      ok: true,
      message: "Growdevers were successfuly listed",
      data: result.map((growdever) => growdever.toJson()),
    });
  } catch (error: any) {
    return res.status(500).send({ ok: false, message: error.toString() });
  }
});

app.post("/growdever/:id", (req: Request, res: Response) => {
  try {
    const { nome, idade } = req.body;

    if (!nome) {
      return res.status(400).send({
        ok: false,
        message: "Nome was not provide",
      });
    }

    if (!idade) {
      return res.status(400).send({
        ok: false,
        message: "Idade was not provide",
      });
    }

    const growdever = new Growdever(nome, idade);

    growdevers.push(growdever);

    return res.status(201).send({
      ok: true,
      message: "Growdever was successfully created",
      data: growdever,
    });
  } catch (error: any) {
    return res.status(500).send({ ok: false, message: error.toString() });
  }
});

app.get("/growdever/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = growdevers.find((growdever) => growdever.id === id);

    if (!result) {
      return res.status(404).send({
        ok: false,
        message: "Growdevers was not found",
        data: result,
      });
    }
    return res.status(200).send({
      ok: true,
      message: "Growdevers was successfuly obtained",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).send({ ok: false, message: error.toString() });
  }
});
