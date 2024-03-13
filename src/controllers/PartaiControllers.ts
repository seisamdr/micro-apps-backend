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

      return res.status(200).json({ message: "Partai created successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const partais = await PartaiServices.find();

      return res.status(200).json(partais);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const partaiId = parseInt(req.params.id);
      const data = req.body;

      await PartaiServices.update(partaiId, data);

      return res.status(200).json({ message: "Partai updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const partaiId = parseInt(req.params.id);

      await PartaiServices.delete(partaiId);

      return res.status(200).json({ message: "Partai deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
})();
