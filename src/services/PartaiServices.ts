import { AppDataSource } from "../data-source";
import { Partai } from "../entity/Partai";

export default new (class PartaiServices {
  async create(reqBody: any): Promise<any> {
    try {
      // const cleanVisimisi = reqBody.visimisi
      //   ? reqBody.visimisi.replace(/["\\]/g, "")
      //   : "";

      // const visimisi = cleanVisimisi ? cleanVisimisi.split(",") : [];

      const partai = AppDataSource.getRepository(Partai).create({
        image: reqBody.image,
        name: reqBody.name,
        leader: reqBody.leader,
        visimisi: reqBody.visimisi,
        address: reqBody.address,
      });

      await AppDataSource.getRepository(Partai)
        .createQueryBuilder()
        .insert()
        .into(Partai)
        .values(partai)
        .execute();

      return partai;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<any> {
    try {
      const partais = await AppDataSource.getRepository(Partai)
        .createQueryBuilder("partai")
        .leftJoinAndSelect("partai.paslon", "paslon")
        .getMany();

      return partais;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const partai = AppDataSource.getRepository(Partai)
        .createQueryBuilder("partai")
        .leftJoinAndSelect("partai.paslon", "paslon")
        .where("partai.id = :id", { id })
        .getOne();

      return partai;
    } catch (error) {
      throw error("Error while finding partai by id:", error);
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const partai = await AppDataSource.getRepository(Partai)
        .createQueryBuilder()
        .update(Partai)
        .set(data)
        .where("id = :id", { id })
        .execute();

      return partai;
    } catch (error) {
      throw error("Failed to update partai!", error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const partai = await AppDataSource.getRepository(Partai)
        .createQueryBuilder()
        .delete()
        .from(Partai)
        .where("id = :id", { id })
        .execute();

      return partai;
    } catch (error) {
      throw error("Failed to delete user!", error);
    }
  }
})();
