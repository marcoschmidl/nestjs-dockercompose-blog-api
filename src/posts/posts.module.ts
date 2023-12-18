import { Module } from '@nestjs/common';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';
import { Posts } from './posts/posts';

@Module({
  providers: [PostsService, Posts],
  controllers: [PostsController]
})
export class PostsModule {}
