import { Request, Response } from "express";
import VoteServices from "../services/VoteServices";
import { VoteValidators } from "../utils/validators/VoteValidators";

export default new (class VoteControllers {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error, value } = VoteValidators.validate(data);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const vote = await VoteServices.create(data);

      return res.status(200).json(vote);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const votes = await VoteServices.findAll();

      return res.status(200).json(votes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const voteId = parseInt(req.params.id);
      const vote = await VoteServices.findOne(voteId);

      if (vote) {
        res.status(200).json(vote);
      } else {
        res.status(404).json({ message: "vote not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get vote", error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      const voteId = parseInt(req.params.id);

      const { error, value } = VoteValidators.validate(data);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const vote = await VoteServices.findOne(voteId);

      if (!vote) return res.status(404).json({ message: "id not found" });

      await VoteServices.update(voteId, data);

      return res.status(200).json({ message: "Update vote success!", vote });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get vote", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const voteId = parseInt(req.params.id);
      const vote = await VoteServices.findOne(voteId);

      if (!vote) return res.status(404).json({ message: "id not found" });

      await VoteServices.delete(voteId);

      return res.status(200).json({ message: "Delete vote succses!", vote });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete vote", error: error.message });
    }
  }
})();
