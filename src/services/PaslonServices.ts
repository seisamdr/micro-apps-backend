import { AppDataSource } from "../data-source";
import { Paslon } from "../entity/Paslon";

export default new (class PaslonServices {
  async create(reqBody: any): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(Paslon);

      const paslon = repository.create({
        name: reqBody.name,
        image: reqBody.image,
        visimisi: reqBody.visimisi,
        koalisi: reqBody.koalisi,
      });

      await AppDataSource.createQueryBuilder()
        .insert()
        .into(Paslon)
        .values(paslon)
        .execute();

      console.log(paslon);
    } catch (error) {
      throw error;
    }
  }

  async find(): Promise<any> {
    try {
      const paslon = await AppDataSource.getRepository(Paslon)
        .createQueryBuilder("paslon")
        .getMany();

      return paslon;
    } catch (error) {
      throw error;
    }
  }

  async patch(paslonId: number, reqBody: any): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(Paslon);

      await repository
        .createQueryBuilder()
        .update(Paslon)
        .set(reqBody)
        .where("id = :id", { id: paslonId })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async delete(paslonId: number): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(Paslon);

      await repository
        .createQueryBuilder()
        .delete()
        .from(Paslon)
        .where("id = :id", { id: paslonId })
        .execute();
    } catch (error) {
      throw error;
    }
  }
})();
