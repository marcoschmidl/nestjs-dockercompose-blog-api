import { Users } from './entity/users.entity';
import { USER_REPOSITORY } from '../../core/constants';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: Users,
  },
];
