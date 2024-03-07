import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vote } from "./Vote";

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

  @OneToMany(() => Vote, (vote) => vote.user)
  vote: Vote[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
