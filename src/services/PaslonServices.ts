import { AppDataSource } from "../data-source";
import { Paslon } from "../entity/Paslon";

export default new (class PaslonServices {
  async create(reqBody: any): Promise<any> {
    try {
      const cleanVisimisi = reqBody.visimisi
        ? reqBody.visimisi.replace(/["\\]/g, "")
        : "";
      const cleanKoalisi = reqBody.koalisi
        ? reqBody.koalisi.replace(/["\\]/g, "")
        : "";

      const visimisi = cleanVisimisi ? cleanVisimisi.split(",") : [];
      const koalisi = cleanKoalisi ? cleanKoalisi.split(",") : [];

      const paslon = AppDataSource.getRepository(Paslon).create({
        name: reqBody.name,
        image: reqBody.image,
        visimisi: visimisi,
        koalisi: koalisi,
      });

      await AppDataSource.getRepository(Paslon)
        .createQueryBuilder()
        .insert()
        .into(Paslon)
        .values(paslon)
        .execute();

      return paslon;
    } catch (error) {
      console.log("Error in creating paslon:", error);
      throw error;
    }
  }

  async findAll(): Promise<any> {
    try {
      const paslons = await AppDataSource.getRepository(Paslon)
        .createQueryBuilder("paslon")
        .leftJoinAndSelect("paslon.partai", "partai")
        .getMany();

      return paslons;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const paslon = AppDataSource.getRepository(Paslon)
        .createQueryBuilder("paslon")
        .leftJoinAndSelect("paslon.partai", "partai")
        .where("paslon.id = :id", { id })
        .getOne();

      return paslon;
    } catch (error) {
      throw error("Error while finding paslon by id:", error);
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const paslon = await AppDataSource.getRepository(Paslon)
        .createQueryBuilder()
        .update(Paslon)
        .set(data)
        .where("id = :id", { id })
        .execute();

      return paslon;
    } catch (error) {
      throw error("Failed to update paslon!", error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const paslon = await AppDataSource.getRepository(Paslon)
        .createQueryBuilder()
        .delete()
        .from(Paslon)
        .where("id = :id", { id })
        .execute();

      return paslon;
    } catch (error) {
      throw error("Failed to delete user!", error);
    }
  }
})();
