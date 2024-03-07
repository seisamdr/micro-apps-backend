import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { UserValidator } from "../utils/validators/UserValidator";

export default new (class UserControllers {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error, value } = UserValidator.validate(data);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user = await UserServices.create(data);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserServices.find();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);
      const data = req.body;

      await UserServices.patch(userId, data);

      return res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);

      await UserServices.delete(userId);

      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
})();
