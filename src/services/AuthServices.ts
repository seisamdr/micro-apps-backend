import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export default new (class UserServices {
  async register(reqBody: any): Promise<any> {
    try {
      const user = AppDataSource.getRepository(User).create({
        fullname: reqBody.fullname,
        address: reqBody.address,
        gender: reqBody.gender,
        username: reqBody.username,
        password: reqBody.password,
      });

      await AppDataSource.getRepository(User)
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .execute();

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async login(username: string, password: string): Promise<any> {
    const repository = AppDataSource.getRepository(User);
    const user = await repository.findOne({ where: { username, password } });

    return user;
  }
})();
