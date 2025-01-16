import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { Post } from './entities/post.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<GetPostDto> {
    const postData = Post.create(createPostDto).getData();
    await this.prisma.post.create({ data: postData });
    return postData;
  }

  findAll(): Promise<GetPostDto[]> {
    return this.prisma.post.findMany();
  }

  findOne(id: string): Promise<GetPostDto> {
    return this.prisma.post.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<GetPostDto> {
    const postUpdated = Post.update(id, updatePostDto).getData();
    await this.prisma.post.update({ where: { id }, data: postUpdated });
    return postUpdated;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}
