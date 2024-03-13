import { AppDataSource } from "../data-source";
import { Paslon } from "../entity/Paslon";
import { User } from "../entity/User";
import { Vote } from "../entity/Vote";

export default new (class VoteService {
  async isVoteExists(userId: number): Promise<boolean> {
    try {
      const voteRepository = AppDataSource.getRepository(Vote);

      const voteCount = await voteRepository
        .createQueryBuilder("vote")
        .where("vote.user = :userId", { userId })
        .getCount();

      return voteCount > 0;
    } catch (error) {
      throw error;
    }
  }

  async createVote(userId: number, paslonId: number): Promise<Vote> {
    try {
      const voteRepository = AppDataSource.getRepository(Vote);
      const userRepository = AppDataSource.getRepository(User);
      const paslonRepository = AppDataSource.getRepository(Paslon);

      const user = await userRepository.findOne({
        where: { id: userId },
      });
      const paslon = await paslonRepository.findOne({
        where: { id: paslonId },
      });

      if (!user || !paslon) {
        throw new Error("User or Paslon not found");
      }

      const newVote = voteRepository.create({
        user,
        paslon,
      });

      return await voteRepository.save(newVote);
    } catch (error) {
      throw error;
    }
  }

  async getAllVotes(): Promise<Vote[]> {
    try {
      const voteRepository = AppDataSource.getRepository(Vote);
      return await voteRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async updateVote(voteId: number, newData: Partial<Vote>): Promise<void> {
    try {
      const voteRepository = AppDataSource.getRepository(Vote);
      await voteRepository.update({ id: voteId }, newData);
    } catch (error) {
      throw error;
    }
  }

  async deleteVote(voteId: number): Promise<void> {
    try {
      const voteRepository = AppDataSource.getRepository(Vote);
      await voteRepository.delete({ id: voteId });
    } catch (error) {
      throw error;
    }
  }
})();
