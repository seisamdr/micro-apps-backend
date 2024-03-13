import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";

export default new (class UserControllers {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const user = await AuthServices.register(data);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    const { username, password } = req.body;
    try {
      const user = await AuthServices.login(username, password);
      if (user) {
        res.status(200).json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "username or passwword wrong!" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Filed to login!", error: error.message });
    }
  }
})();
