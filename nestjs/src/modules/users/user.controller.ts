import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Posts as PostEntity } from '../posts/posts.entity';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from '../posts/dto/postdto';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { UserDto } from './dto/userdto';

@Controller('user')
export class UserController {

  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll() {
    // get all posts in the db
    return await this.usersService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<Users> {
    const users = await this.usersService.findOneByEmail(email);
    if (!users) {
      throw new NotFoundException("This Email doesn't exist");
    }
    return users;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() user: UserDto, @Request() req): Promise<Users> {
    // create a new post and return the newly created post
    const { id } = req.user;
    return await this.usersService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req,
  ): Promise<PostEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      post,
      req.user.id,
    );

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return the updated post
    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.postService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}


