// Paslon.ts
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vote } from "./Vote";
import { Partai } from "./Partai";

@Entity()
export class Paslon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ type: "jsonb" })
  visimisi: any;

  @Column({ type: "jsonb" })
  koalisi: any;

  @ManyToOne(() => Partai, (partai) => partai.paslon)
  partai: Partai;

  @OneToMany(() => Vote, (vote) => vote.paslon)
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
