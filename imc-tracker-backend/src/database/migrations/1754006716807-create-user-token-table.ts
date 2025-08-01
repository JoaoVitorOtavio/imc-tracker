import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTokenTable1754006716807 implements MigrationInterface {
    name = 'CreateUserTokenTable1754006716807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario_token" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" varchar(255) NOT NULL, "id_usuario" varchar NOT NULL, "expiracao_token" datetime NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_usuario_token" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" varchar(255) NOT NULL, "id_usuario" varchar NOT NULL, "expiracao_token" datetime NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_98f38347099798d02785592a671" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_usuario_token"("id", "refresh_token", "id_usuario", "expiracao_token", "dt_inclusao") SELECT "id", "refresh_token", "id_usuario", "expiracao_token", "dt_inclusao" FROM "usuario_token"`);
        await queryRunner.query(`DROP TABLE "usuario_token"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario_token" RENAME TO "usuario_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_token" RENAME TO "temporary_usuario_token"`);
        await queryRunner.query(`CREATE TABLE "usuario_token" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" varchar(255) NOT NULL, "id_usuario" varchar NOT NULL, "expiracao_token" datetime NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "usuario_token"("id", "refresh_token", "id_usuario", "expiracao_token", "dt_inclusao") SELECT "id", "refresh_token", "id_usuario", "expiracao_token", "dt_inclusao" FROM "temporary_usuario_token"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario_token"`);
        await queryRunner.query(`DROP TABLE "usuario_token"`);
    }

}
