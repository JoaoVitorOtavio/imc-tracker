import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImcTable1754006773271 implements MigrationInterface {
    name = 'CreateImcTable1754006773271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "avaliacao_imc" ("id" varchar PRIMARY KEY NOT NULL, "altura" decimal(5,2) NOT NULL, "peso" decimal(5,2) NOT NULL, "imc" decimal(5,2) NOT NULL, "classificacao" varchar(30) NOT NULL, "id_usuario_avaliacao" varchar NOT NULL, "id_usuario_aluno" varchar NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_avaliacao_imc" ("id" varchar PRIMARY KEY NOT NULL, "altura" decimal(5,2) NOT NULL, "peso" decimal(5,2) NOT NULL, "imc" decimal(5,2) NOT NULL, "classificacao" varchar(30) NOT NULL, "id_usuario_avaliacao" varchar NOT NULL, "id_usuario_aluno" varchar NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_d276f2482c6d64ddc36c3229fa6" FOREIGN KEY ("id_usuario_avaliacao") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, CONSTRAINT "FK_b3b4bd4196d4d625dc4307412e8" FOREIGN KEY ("id_usuario_aluno") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_avaliacao_imc"("id", "altura", "peso", "imc", "classificacao", "id_usuario_avaliacao", "id_usuario_aluno", "dt_inclusao") SELECT "id", "altura", "peso", "imc", "classificacao", "id_usuario_avaliacao", "id_usuario_aluno", "dt_inclusao" FROM "avaliacao_imc"`);
        await queryRunner.query(`DROP TABLE "avaliacao_imc"`);
        await queryRunner.query(`ALTER TABLE "temporary_avaliacao_imc" RENAME TO "avaliacao_imc"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avaliacao_imc" RENAME TO "temporary_avaliacao_imc"`);
        await queryRunner.query(`CREATE TABLE "avaliacao_imc" ("id" varchar PRIMARY KEY NOT NULL, "altura" decimal(5,2) NOT NULL, "peso" decimal(5,2) NOT NULL, "imc" decimal(5,2) NOT NULL, "classificacao" varchar(30) NOT NULL, "id_usuario_avaliacao" varchar NOT NULL, "id_usuario_aluno" varchar NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "avaliacao_imc"("id", "altura", "peso", "imc", "classificacao", "id_usuario_avaliacao", "id_usuario_aluno", "dt_inclusao") SELECT "id", "altura", "peso", "imc", "classificacao", "id_usuario_avaliacao", "id_usuario_aluno", "dt_inclusao" FROM "temporary_avaliacao_imc"`);
        await queryRunner.query(`DROP TABLE "temporary_avaliacao_imc"`);
        await queryRunner.query(`DROP TABLE "avaliacao_imc"`);
    }

}
