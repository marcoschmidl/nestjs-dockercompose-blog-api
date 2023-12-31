import { Injectable, Inject } from '@nestjs/common';
import { POST_REPOSITORY } from '../../core/constants';
import { PostDto } from './dto/postdto';
import { Posts } from './posts.entity';
import { Users } from '../users/entity/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Posts,
  ) {}

  async create(post: PostDto, userId: any): Promise<Posts> {
    return await this.postRepository.create<Posts>({ ...post, userId });
  }

  async findAll(): Promise<Posts[]> {
    return await this.postRepository.findAll<Posts>({
      include: [{ model: Users, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Posts> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: Users, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }
}
