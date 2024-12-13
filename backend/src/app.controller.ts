/* eslint-disable class-methods-use-this */
import { Controller } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly appService: AppService) {}
}
