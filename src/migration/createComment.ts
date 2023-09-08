import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComment1690856966745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS comment (
      id int NOT NULL AUTO_INCREMENT,
      createdAt datetime DEFAULT CURRENT_TIMESTAMP,
      updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
      createdBy int DEFAULT NULL,
      updatedBy int DEFAULT NULL,
      type varchar(255) DEFAULT NULL,
      type_id int NOT NULL,
      parentId int DEFAULT NULL,
      image varchar(555) DEFAULT NULL,
      like varchar(555) DEFAULT '[]',
      totalLike int DEFAULT 0,
      content varchar(1000) DEFAULT NULL,
      number1 int DEFAULT 0,
      number2 int DEFAULT 0,
      number3 int DEFAULT 0,
      number4 int DEFAULT 0,
      number5 int DEFAULT 0,
      isDeleted boolean DEFAULT FALSE,
      isActive boolean DEFAULT TRUE,
      customerId int NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE comment");
  }
}
