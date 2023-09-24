import { Role } from "src/config/role";
import CoreEntity from "../../../../src/entities/CoreEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity({ name: "products" })
export class Product extends CoreEntity {
  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar", length: 1000, nullable: true })
  description: string;

  @Column({ type: "varchar", length: 555, nullable: true })
  thumbnail: string;

  @Column({ type: "text", nullable: true })
  images: string;

  @Column({ type: "int", default: 0 })
  price: number;

  @Column({ type: "varchar", nullable: true })
  unit: string;

  @Column({})
  race: number;

  @Column({ type: "longtext", nullable: true })
  blog: string;

  @Column({ type: "int", default: 0 })
  categoryId: number;

  @Column({ type: "int", default: 0 })
  usreId: number;

  @Column({ type: "boolean", default: false })
  isDeleted: boolean;
}
