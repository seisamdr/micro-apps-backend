import { AppDataSource } from "../data-source";
import { Article } from "../entity/Article";
import UserServices from "./UserServices";

export default new (class ArticleServices {
  async create(reqBody: any): Promise<any> {
    try {
      const author = await UserServices.findOne(reqBody.author);
      const article = AppDataSource.getRepository(Article).create({
        title: reqBody.title,
        content: reqBody.content,
        author: author,
        image: reqBody.image,
      });

      await AppDataSource.getRepository(Article)
        .createQueryBuilder()
        .insert()
        .into(Article)
        .values(article)
        .execute();

      return article;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<any> {
    try {
      const articles = await AppDataSource.getRepository(Article)
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.author", "author")
        .getMany();

      return articles;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const article = AppDataSource.getRepository(Article)
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.author", "author")
        .where("article.id = :id", { id: id })
        .getOne();

      return article;
    } catch (error) {
      throw error("Error while finding article by id:", error);
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const article = await AppDataSource.getRepository(Article)
        .createQueryBuilder()
        .update(Article)
        .set(data)
        .where("id = :id", { id })
        .execute();

      return article;
    } catch (error) {
      throw error("Failed to update article!", error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const article = await AppDataSource.getRepository(Article)
        .createQueryBuilder()
        .delete()
        .from(Article)
        .where("id = :id", { id })
        .execute();

      return article;
    } catch (error) {
      throw error("Failed to delete user!", error);
    }
  }
})();
