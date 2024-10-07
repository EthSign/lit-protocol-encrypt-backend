require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitNetwork } from "@lit-protocol/constants";

class Lit {
  litNodeClient: any;
  chain;

  constructor(chain: string) {
    this.chain = chain;
  }

  async connect() {
    app.locals.litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
      alertWhenUnauthorized: false,
      litNetwork: "datil-dev",
      debug: true
    });

    this.litNodeClient = app.locals.litNodeClient;
    await this.litNodeClient.connect();
  }
}

const app = express();

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/status", (req: Request, res: Response) => {
  res.status(200).json({
    data: {
      message: "Encrypt Backend is Operational"
    }
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: {
      message: `Route: ${req.originalUrl} does not exist on this server`
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  const chain = "ethereum";

  let myLit = new Lit(chain);
  await myLit.connect();

  console.log(`🚀Server started Successfully on Port ${PORT}.`);
});
