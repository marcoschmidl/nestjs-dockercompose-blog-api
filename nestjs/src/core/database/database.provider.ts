import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Users } from '../../modules/users/users.entity';
import { PostDto } from '../../modules/posts/dto/postdto';
import { Posts } from '../../modules/posts/posts.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Users, Posts]); // hier kommen alle Model hinzu. Ein Model wird in einem Modul erstellt.
      await sequelize.sync();
      return sequelize;
    },
  },
];
