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

  @Column()
  visimisi: string;

  @Column()
  koalisi: string;

  @OneToMany(() => Vote, (vote) => vote.paslon) // Specify the correct property name
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
