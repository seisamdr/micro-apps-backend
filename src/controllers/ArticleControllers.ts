import { Request, Response } from "express";
import { ArticleValidator } from "../utils/validators/ArticleValidator";
import ArticleServices from "../services/ArticleServices";

export default new (class ArticleControllers {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error, value } = ArticleValidator.validate(data);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const article = await ArticleServices.create(data);

      return res.status(200).json({ message: "Article created successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const articles = await ArticleServices.find();

      return res.status(200).json(articles);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const article = await ArticleServices.findOne(id);

      if (article) {
        res.status(201).json(article);
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get Article", error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const articleId = parseInt(req.params.id);
      const data = req.body;

      await ArticleServices.update(articleId, data);

      return res.status(200).json({ message: "Article updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const articleId = parseInt(req.params.id);

      await ArticleServices.delete(articleId);

      return res.status(200).json({ message: "Article deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
})();
