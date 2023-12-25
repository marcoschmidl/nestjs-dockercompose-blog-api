import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/users.entity';
import { UserDto } from '../users/dto/userdto';


//TODO: Ist das User DTO hier an der richtigen Stelle?
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); //TODO: Logging nochmal checken
  private result: Omit<UserDto, 'password'>;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userResult = await this.userService.findOneByEmail(username);
    if (!userResult) {
      this.logger.debug('Failed to validate user: user not found');
      return null;
    }
    const isPasswordMatching = await this.comparePassword(
      pass,
      userResult.password,
    );
    if (!isPasswordMatching) {
      this.logger.warn('Failed to validate user: password did not match');
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userResult; //userResult['dataValues'];
    return result;
  }
  public async login(user: UserDto): Promise<any> {
    const token = await this.generateToken(<Users>user);
    return { user, token };
  }

  public async create(user: UserDto): Promise<any> {
    const hashedPassword = await this.hashPassword(user.password);
    const newUser = await this.userService.create({
      ...user,
      password: hashedPassword,
    });
    // tslint:disable-next-line: no-string-literal
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];
    // @ts-ignore
    const token = await this.generateToken(result instanceof Users ? result);
    return { user: result, token };
  }
  private async generateToken(user: Users) {
    return await this.jwtService.signAsync(user);
  }

  private async hashPassword(password: string): Promise<string> {
    if (!password || password === '') {
      throw new Error('Password is required');
    }
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
