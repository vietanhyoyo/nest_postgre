import { Tag } from "@/entities/tag";

export interface UpdateNewsInput {
    news_id?: number;
    title?: string;
    thumbnail?: string;
    author?: string;
    description?: string;
    content?: string;
    tags?: Tag[];
}