import { Users } from './users.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: Users,
  },
];
