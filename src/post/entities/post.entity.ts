import { randomUUID } from "crypto";
import { CreatePostDto } from "../dto/create-post.dto";
import { GetPostDto } from "../dto/get-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";

export class Post {
    constructor(private readonly id: string, private readonly title: string, private readonly content: string) {}

    static create(createPostDto: CreatePostDto): Post {
        return new Post(randomUUID(), createPostDto.title, createPostDto.content);
    }

    static update(id: string, updatePostDto: UpdatePostDto): Post {
        return new Post(id, updatePostDto.title, updatePostDto.content);
    }


    getData(): GetPostDto {
        return {
            id: this.id,
            title: this.title,
            content: this.content
        }
    }
}
