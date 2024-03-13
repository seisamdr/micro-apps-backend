import { Request, Response } from "express";
import VoteServices from "../services/VoteServices";

export default new (class VoteController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, paslonId } = req.body;

      const isVoteExists = await VoteServices.isVoteExists(userId);
      if (isVoteExists) {
        return res.status(400).json({ message: "User has already voted." });
      }

      const newVote = await VoteServices.createVote(userId, paslonId);

      return res
        .status(201)
        .json({ message: "Vote created successfully", vote: newVote });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const votes = await VoteServices.getAllVotes();
      return res.status(200).json(votes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const voteId = parseInt(req.params.id);
      const newData = req.body;

      await VoteServices.updateVote(voteId, newData);
      return res.status(200).json({ message: "Vote updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const voteId = parseInt(req.params.id);
      await VoteServices.deleteVote(voteId);

      return res.status(200).json({ message: "Vote deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
})();
