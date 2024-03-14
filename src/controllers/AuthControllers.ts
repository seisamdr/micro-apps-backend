import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";
import { UserValidator } from "../utils/validators/UserValidator";

export default new (class UserControllers {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error, value } = UserValidator.validate(data);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user = await AuthServices.register(data);

      return res.status(200).json(user);
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
        res.status(400).json({ message: "Username or Password wrong!" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to login!", error: error.message });
    }
  }
})();
