import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let testData: Record<string, any>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    testData = JSON.parse(
      fs.readFileSync('__fixtures__/testData.json', 'utf-8'),
    ).code;
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('compile ', async () => {
    return request(app.getHttpServer())
      .get(`/compile?code=${testData.input};`)
      .expect(200)
      .expect(testData.output);
  });
});
