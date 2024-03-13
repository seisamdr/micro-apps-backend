import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export default new (class UserServices {
  async findOne(id: number): Promise<any> {
    try {
      const user = AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.articles", "articles")
        .where("user.id = :id", { id: id })
        .getOne();

      return user;
    } catch (error) {
      throw error("Error while finding user by id:", error);
    }
  }

  async find(): Promise<any> {
    try {
      const users = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.articles", "articles")
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder()
        .leftJoinAndSelect("user.articles", "articles")
        .update(User)
        .set(data)
        .where("user.id = :id", { id: id })
        .execute();
      return user;
    } catch (error) {
      throw error("Filed to update user!", error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("user.id = :id", { id: id })
        .execute();

      return user;
    } catch (error) {
      throw error("Filed to delete user!", error);
    }
  }
})();
