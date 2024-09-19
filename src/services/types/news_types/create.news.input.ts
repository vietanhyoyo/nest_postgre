import { Tag } from "@/entities/tag";

export interface CreateNewsInput {
    title?: string;
    thumbnail?: string;
    author?: string;
    description?: string;
    content?: string;
    tags?: Tag[];
}