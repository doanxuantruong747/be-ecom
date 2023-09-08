import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateComment1690968415829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "comment",
      new TableColumn({
        name: "totalCommentChild",
        type: "int",
        default: 0,
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("comment", "totalCommentChild");
  }
}
