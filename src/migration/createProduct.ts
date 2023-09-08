import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1647543648874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS products (
      id int NOT NULL AUTO_INCREMENT,
      createdAt datetime DEFAULT CURRENT_TIMESTAMP,
      updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
      name varchar(255) DEFAULT NULL,
      description varchar(1000) DEFAULT NULL,
      thumbnail varchar(500) DEFAULT NULL,
      price int NOT NULL,
      unit varchar(255) NULL,
      race int NOT NULL,
      blog json DEFAULT NULL,
      categoryId int NOT NULL,
      userId int NOT NULL,
      isDeleted boolean DEFAULT FALSE,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE coupon");
  }
}
