import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
