// Paslon.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vote } from "./Vote";

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
