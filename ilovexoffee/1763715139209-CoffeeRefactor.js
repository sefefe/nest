/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CoffeeRefactor1763715139209 {

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
        )
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(
         `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
        )
    }

}
