import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JWTAuthGuard)
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }
}
