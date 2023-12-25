import { POST_REPOSITORY } from '../../core/constants';
import { Posts } from './posts.entity';

export const postsProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: Posts,
  },
];
