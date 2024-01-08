import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Posts } from './modules/posts/posts.entity';
import { request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    ///TODO; brauche ich das überhaupt oder ist das ausschließlich eine Demo?
    return this.appService.getHello();
  }
  @Post()
  postTest(@Req() req: Request) {
    return req.body;
  }
}
