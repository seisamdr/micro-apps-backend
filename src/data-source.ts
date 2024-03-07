import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Article } from "./entity/Article";
import { Partai } from "./entity/Partai";
import { Paslon } from "./entity/Paslon";
import { Vote } from "./entity/Vote";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "microapps",
  synchronize: true,
  logging: false,
  entities: [User, Article, Partai, Paslon, Vote],
  migrations: [],
  subscribers: [],
});
