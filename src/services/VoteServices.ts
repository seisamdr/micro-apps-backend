import { AppDataSource } from "../data-source";
import { Vote } from "../entity/Vote";
import PaslonServices from "./PaslonServices";
import UserServices from "./UserServices";

export default new (class voteServices {
  async create(reqBody: any): Promise<any> {
    const userId = parseInt(reqBody.userId);
    const paslonId = parseInt(reqBody.paslonId);

    if (isNaN(userId) || isNaN(paslonId)) {
      throw new Error("Invalid userId or paslonId");
    }

    const user = await UserServices.findOne(userId);
    const paslon = await PaslonServices.findOne(paslonId);

    if (!user || !paslon) {
      throw new Error("User or paslon not found");
    }

    try {
      const vote = AppDataSource.getRepository(Vote).create({
        user: user,
        paslon: paslon,
      });

      await AppDataSource.getRepository(Vote)
        .createQueryBuilder()
        .insert()
        .into(Vote)
        .values(vote)
        .execute();

      return vote;
    } catch (error) {
      throw new Error("Failed to create vote");
    }
  }

  async findAll(): Promise<any> {
    try {
      const votes = await AppDataSource.getRepository(Vote)
        .createQueryBuilder("vote")
        .leftJoinAndSelect("vote.paslon", "paslon")
        .leftJoinAndSelect("vote.user", "user")
        .getMany();

      return votes;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const vote = AppDataSource.getRepository(Vote)
        .createQueryBuilder("vote")
        .leftJoinAndSelect("vote.paslon", "paslon")
        .leftJoinAndSelect("vote.user", "user")
        .where("vote.id = :id", { id })
        .getOne();

      return vote;
    } catch (error) {
      throw error("Error while finding vote by id:", error);
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const validData = {
        user: data.userId,
        paslon: data.paslonId,
      };

      const vote = await AppDataSource.getRepository(Vote)
        .createQueryBuilder()
        .update(Vote)
        .set(validData)
        .where("id = :id", { id })
        .execute();

      return vote;
    } catch (error) {
      throw new Error("Failed to update vote!");
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const vote = await AppDataSource.getRepository(Vote)
        .createQueryBuilder()
        .delete()
        .from(Vote)
        .where("vote.id = :id", { id })
        .execute();

      return vote;
    } catch (error) {
      throw error("Failed to delete user!", error);
    }
  }
})();
