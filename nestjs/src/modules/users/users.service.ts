import { Inject, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { UserDto } from './dto/userdto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') ///TODO: in Anführungszeichen oder nicht?
    private readonly userRepository: typeof Users,
  ) {}

  async create(userDto: UserDto): Promise<Users> {
    return await this.userRepository.create(userDto);
  }

  async findOneByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOne<Users>({ where: { email } });
  }

  async findOneById(id: number): Promise<Users> {
    return await this.userRepository.findOne<Users>({ where: { id } });
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.findAll<Users>();
  }
}
