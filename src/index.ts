import { AppDataSource } from "./data-source";
import express, { Request, Response } from "express";
import cors from "cors";
import Route from "./routes";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    const corsConfig: object = {
      origin: "http://localhost:5173",
    };

    app.use(cors(corsConfig));
    app.use(express.json());
    app.use("/api/v1", Route);

    app.get("/test", (req: Request, res: Response) => {
      const data = {
        message: "Success get data",
      };

      res.status(200).json(data);
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
