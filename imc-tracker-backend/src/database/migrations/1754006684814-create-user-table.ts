import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1754006684814 implements MigrationInterface {
    name = 'CreateUserTable1754006684814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar NOT NULL, "perfil" text(20) NOT NULL, "situacao" text(10) NOT NULL, "dt_inclusao" text NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_9921cd8ed63a072b8f93ead80f0" UNIQUE ("usuario"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
