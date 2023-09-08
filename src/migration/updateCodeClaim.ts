import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateCodeClaim1690968415871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user_claim",
      new TableColumn({
        name: "codeClaim",
        type: "varchar",
        default: null,
        isNullable: true
      })
    );
    await queryRunner.addColumn(
      "user_claim",
      new TableColumn({
        name: "totalBillBeforeDiscount",
        type: "int",
        default: null,
        isNullable: true
      })
    );
    await queryRunner.addColumn(
      "user_claim",
      new TableColumn({
        name: "discountAmount",
        type: "int",
        default: null,
        isNullable: true
      })
    );
    await queryRunner.addColumn(
      "user_claim",
      new TableColumn({
        name: "totalBillAfterDiscount",
        type: "int",
        default: null,
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user_claim", "codeClaim");
    await queryRunner.dropColumn("user_claim", "totalBillBeforeDiscount");
    await queryRunner.dropColumn("user_claim", "discountAmount");
    await queryRunner.dropColumn("user_claim", "totalBillAfterDiscount");
  }
}
