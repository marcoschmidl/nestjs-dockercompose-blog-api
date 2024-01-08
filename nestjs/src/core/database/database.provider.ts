import { Sequelize } from 'sequelize-typescript';
import { DEVELOPMENT, TEST, PRODUCTION, SEQUELIZE } from '../constants';
import { databaseConfig } from './database.config';
import { Users } from '../../modules/users/entity/users.entity';
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
      sequelize.addModels([Users, Posts]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
