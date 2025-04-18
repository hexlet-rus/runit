import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import { RunnerModule } from '../src/runner/runner.module';

describe('RunnerController (e2e)', () => {
  let app: INestApplication;
  let testData: Record<string, any>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RunnerModule],
    }).compile();

    testData = JSON.parse(
      fs.readFileSync('__fixtures__/testData.json', 'utf-8'),
    ).code;
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('compile ', async () => {
    return request(app.getHttpServer())
      .get(
        `/api/runner/run?snippet[code]=${testData.input};&snippet[language]=javascript`,
      )
      .expect(200)
      .expect(testData.output);
  });

  afterAll(async () => {
    await app.close();
  });
});
