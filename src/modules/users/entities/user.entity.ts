import { Role } from "src/config/role";
import CoreEntity from "../../../../src/entities/CoreEntity.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity({ name: "users" })
export class User extends CoreEntity {
  @Column("varchar", { nullable: true })
  userName: string;

  @Column("varchar", { nullable: true })
  password: string;

  @Column("varchar", { default: null })
  avatar: string;

  @Column("varchar", { length: 20, default: "" })
  phone: string;

  @Column("varchar", { length: 50, unique: true })
  email: string;

  @Column({ default: false })
  isBlock: boolean;

  @Column("varchar", { default: Role.CLIENT_USER, nullable: true })
  role: string;

  @Column({ default: false })
  isDeleted: boolean;
}
