import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", {
    name: "createdAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updatedAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  updatedAt: Date | null;
}
