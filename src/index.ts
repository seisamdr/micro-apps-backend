import { AppDataSource } from "./data-source";
import express, { Request, Response } from "express";
import Route from "./routes";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    app.use(express.json());
    app.use("/api/v1", Route);

    app.get("/", (req: Request, res: Response) => {
      const data = {
        message: "Success get data",
      };

      res.status(200).json(data);
    });

    app.patch("/:id", async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);

        const data = req.body;

        res.status(200).json({ message: "Updated successfully." });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    app.delete("/:id", async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);

        res.status(200).json({ message: "Deleted successfully." });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
