import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/userdto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('findAll')
  async findAll() {
    // get all posts in the db
    return await this.usersService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    //    : Promise<Users> {
    const wantedUsers = await this.usersService.findOneByEmail(email);
    if (!wantedUsers) {
      throw new NotFoundException("This Email doesn't exist");
    }
    return wantedUsers;
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() newUser: UserDto) {
    //: Promise<Users> {
    // create a new post and return the newly created post
    //const { id } = req.user;
    return await this.usersService.create(newUser);
  }
}
