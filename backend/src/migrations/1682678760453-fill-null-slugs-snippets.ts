import { generateUniqSlug } from "../snippets/utils/generate-uniq-slug";
import { Snippets } from "../entities/snippet.entity";
import { MigrationInterface, QueryRunner } from "typeorm"

export class FillNullSlugsSnippets1682678760453 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const snippets: Snippets[] = await queryRunner.query(`SELECT id, slug FROM snippets;`);
        const nullSnippets = snippets.filter((snippet) => !snippet.slug)

        await queryRunner.startTransaction();
        for (const nullSnippet of nullSnippets) {
            const slug = generateUniqSlug(snippets);

            await queryRunner.query(`UPDATE snippets SET slug='${slug}' WHERE id=${nullSnippet.id};`)
        }
        await queryRunner.commitTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
