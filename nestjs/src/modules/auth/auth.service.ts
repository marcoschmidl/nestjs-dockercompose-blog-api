import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/userdto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user: string) {
    const token = await this.generateToken(user);
    return { user, token };
  }
  public async create(user: UserDto) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({ ...user, password: pass });

    // tslint:disable-next-line: no-string-literal
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];

    // generate token
    const token = await this.generateToken(result as any);

    // return the user and the token
    return { user: result, token };
  }

  private async generateToken(user: string) {
    return await this.jwtService.signAsync(user);
  }

  private async hashPassword(password: string | Buffer) {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(
    enteredPassword: string | Buffer,
    dbPassword: string,
  ) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
