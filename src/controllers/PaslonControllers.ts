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

      return res.status(200).json(paslon);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const paslons = await PaslonServices.find();

      return res.status(200).json(paslons);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const paslonId = parseInt(req.params.id);
      const data = req.body;

      await PaslonServices.patch(paslonId, data);

      return res.status(200).json({ message: "Paslon updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const paslonId = parseInt(req.params.id);

      await PaslonServices.delete(paslonId);

      return res.status(200).json({ message: "Paslon deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
})();
