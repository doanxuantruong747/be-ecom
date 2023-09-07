import { Role } from "src/config/role";
import CoreEntity from "../../../../src/entities/CoreEntity.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity({ name: "products" })
export class Product extends CoreEntity {
  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar", length: 1000, nullable: true })
  description: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  thumbnail: string;

  @Column("json", { default: [] })
  images: string[];

  @Column({ type: "int" })
  price: number;

  @Column({ type: "varchar", nullable: true })
  unit: string;

  @Column({})
  race: number;

  @Column({ type: "varchar", length: 5000, nullable: true })
  blog: string;

  @Column({ type: "int", default: 0 })
  categoryId: number;

  @Column({ type: "boolean", default: false })
  isDeleted: boolean;
}
