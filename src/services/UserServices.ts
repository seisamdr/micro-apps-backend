import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export default new (class UserServices {
  async create(reqBody: any): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(User);

      const user = repository.create({
        fullname: reqBody.fullname,
        address: reqBody.address,
        gender: reqBody.gender,
        username: reqBody.username,
        password: reqBody.password,
      });

      await AppDataSource.createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .execute();

      console.log(user);
    } catch (error) {
      throw error;
    }
  }

  async find(): Promise<any> {
    try {
      const users = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async patch(userId: number, reqBody: any): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(User);

      await repository
        .createQueryBuilder()
        .update(User)
        .set(reqBody)
        .where("id = :id", { id: userId })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: number): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(User);

      await repository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: userId })
        .execute();
    } catch (error) {
      throw error;
    }
  }
})();
