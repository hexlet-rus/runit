/* eslint-disable no-console */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { AdminsService } from '../admins.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const adminsService = app.get(AdminsService);

  const email = process.argv[2];

  if (!email) {
    console.error('Email is required');
    await app.close();
    return;
  }

  const user = await adminsService.findUserByEmail(email);

  if (!user) {
    console.log(`User with email ${email} not found.`);
    await app.close();
    return;
  }

  await adminsService.update(user.id, { isAdmin: true });
  console.log(`User with email ${email} has been set as admin.`);

  await app.close();
}

bootstrap().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
