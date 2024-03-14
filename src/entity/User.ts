import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Article } from "./Article";
import { Vote } from "./Vote";

export enum Roles {
  Admin = "Admin",
  User = "User",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: Roles,
    default: Roles.User,
  })
  role: Roles;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
