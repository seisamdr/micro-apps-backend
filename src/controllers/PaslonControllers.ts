import { Request, Response } from "express";
import { PaslonValidators } from "../utils/validators/PaslonValidators";
import PaslonServices from "../services/PaslonServices";

export default new (class PaslonControllers {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error, value } = PaslonValidators.validate(data);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const paslon = await PaslonServices.create(data);

      return res
        .status(200)
        .json({ message: "Paslon created successfully.", paslon });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const paslons = await PaslonServices.findAll();

      return res.status(200).json(paslons);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const paslonId = parseInt(req.params.id);
      const paslon = await PaslonServices.findOne(paslonId);

      if (paslon) {
        res.status(200).json(paslon);
      } else {
        res.status(404).json({ message: "Paslon not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get paslon", error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      const paslonId = parseInt(req.params.id);

      const { error, value } = PaslonValidators.validate(data);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const paslon = await PaslonServices.findOne(paslonId);

      if (!paslon) return res.status(404).json({ message: "id not found" });

      await PaslonServices.update(paslonId, data);

      return res
        .status(200)
        .json({ message: "Paslon updated successfully.", paslon });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get paslon", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const paslonId = parseInt(req.params.id);
      const paslon = await PaslonServices.findOne(paslonId);

      if (!paslon) return res.status(404).json({ message: "id not found" });

      await PaslonServices.delete(paslonId);

      return res
        .status(200)
        .json({ message: "Paslon deleted successfully.", paslon });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete paslon", error: error.message });
    }
  }
})();
