import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757358555120 implements MigrationInterface {
    name = 'InitialMigration1757358555120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_column_enum" AS ENUM('todo', 'doing', 'done')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" text, "column" "public"."task_column_enum" NOT NULL DEFAULT 'todo', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_column_enum"`);
    }

}
