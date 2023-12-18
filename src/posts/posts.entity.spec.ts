import { PostsEntity } from './posts/posts.entity';

describe('PostsEntity', () => {
  it('should be defined', () => {
    expect(new PostsEntity()).toBeDefined();
  });
});
