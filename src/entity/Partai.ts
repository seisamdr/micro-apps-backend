import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Partai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  leader: string;

  @Column()
  visimisi: string;

  @Column()
  address: string;

  @Column()
  logo: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;
}
