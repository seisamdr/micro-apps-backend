import { Request, Response } from "express";
import { PartaiValidators } from "../utils/validators/PartaiValidators";
import PartaiServices from "../services/PartaiServices";

export default new (class PartaiControllers {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error, value } = PartaiValidators.validate(data);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const partai = await PartaiServices.create(data);

      return res
        .status(200)
        .json({ message: "Partai created successfully.", partai });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const partais = await PartaiServices.findAll();

      return res.status(200).json(partais);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const partaiId = parseInt(req.params.id);
      const partai = await PartaiServices.findOne(partaiId);

      if (partai) {
        res.status(200).json(partai);
      } else {
        res.status(404).json({ message: "Partai not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get partai", error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      const partaiId = parseInt(req.params.id);

      const { error, value } = PartaiValidators.validate(data);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const partai = await PartaiServices.findOne(partaiId);

      if (!partai) return res.status(404).json({ message: "id not found" });

      await PartaiServices.update(partaiId, data);

      return res
        .status(200)
        .json({ message: "Partai updated successfully.", partai });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get partai", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const partaiId = parseInt(req.params.id);
      const partai = await PartaiServices.findOne(partaiId);

      if (!partai) return res.status(404).json({ message: "id not found" });

      await PartaiServices.delete(partaiId);

      return res
        .status(200)
        .json({ message: "Partai deleted successfully.", partai });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete partai", error: error.message });
    }
  }
})();
