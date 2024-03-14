import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Paslon } from "./Paslon";

@Entity()
export class Partai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  leader: string;

  @Column({ type: "jsonb" })
  visimisi: any;

  @Column()
  address: string;

  @OneToMany(() => Paslon, (paslon) => paslon.partai)
  paslon: Paslon[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
