import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { UsersModule } from '../../modules/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
