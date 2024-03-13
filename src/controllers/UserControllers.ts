import { Request, Response } from "express";
import UserServices from "../services/UserServices";

export default new (class UserControllers {
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserServices.find();

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
      const id = parseInt(req.params.id);
      const data = req.body;

      const user = await UserServices.findOne(id);

      if (!user) return res.status(404).json({ message: "id not found" });

      await UserServices.update(id, data);

      return res.status(200).json({ message: "Update user success!", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get user", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const user = await UserServices.findOne(id);
      if (!user) return res.status(404).json({ message: "id not found" });

      await UserServices.delete(id);

      return res.status(200).json({ message: "Delete user succses!", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete user", error: error.message });
    }
  }
})();
