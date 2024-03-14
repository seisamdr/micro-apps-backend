import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { UserValidator } from "../utils/validators/UserValidator";

export default new (class UserControllers {
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserServices.findAll();

      return res.status(201).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserServices.findOne(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      const userId = parseInt(req.params.id);

      const { error, value } = UserValidator.validate(data);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user = await UserServices.findOne(userId);

      if (!user) return res.status(404).json({ message: "id not found" });

      await UserServices.update(userId, data);

      return res
        .status(200)
        .json({ message: "User updated successfully.", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get user", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserServices.findOne(userId);

      if (!user) return res.status(404).json({ message: "id not found" });

      await UserServices.delete(userId);

      return res
        .status(200)
        .json({ message: "User deleted successfully.", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete user", error: error.message });
    }
  }
})();
