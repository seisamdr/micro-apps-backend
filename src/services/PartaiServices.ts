import { AppDataSource } from "../data-source";
import { Partai } from "../entity/Partai";

export default new (class PartaiServices {
  async create(reqBody: any): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(Partai);

      const cleanVisimisi = reqBody.visimisi
        ? reqBody.visimisi.replace(/["\\]/g, "")
        : "";

      const visimisi = cleanVisimisi ? cleanVisimisi.split(",") : [];

      const partai = repository.create({
        image: reqBody.image,
        name: reqBody.name,
        leader: reqBody.leader,
        visimisi,
        address: reqBody.address,
      });

      await AppDataSource.createQueryBuilder()
        .insert()
        .into(Partai)
        .values(partai)
        .execute();

      console.log(partai);
    } catch (error) {
      throw error;
    }
  }

  async find(): Promise<any> {
    try {
      const partai = await AppDataSource.getRepository(Partai)
        .createQueryBuilder("partai")
        .getMany();

      return partai;
    } catch (error) {
      throw error;
    }
  }

  async update(partaiId: number, reqBody: any): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(Partai);

      await repository
        .createQueryBuilder()
        .update(Partai)
        .set(reqBody)
        .where("id = :id", { id: partaiId })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async delete(partaiId: number): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(Partai);

      await repository
        .createQueryBuilder()
        .delete()
        .from(Partai)
        .where("id = :id", { id: partaiId })
        .execute();
    } catch (error) {
      throw error;
    }
  }
})();
