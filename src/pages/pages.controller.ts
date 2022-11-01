/* eslint-disable class-methods-use-this */
import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class PagesController {
  @Get('/')
  @Render('landing/landing-editor')
  landing() {
    return {};
  }
}
