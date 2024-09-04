import { Tag } from 'src/entities/tag';

export interface UpdateIdolInput {
  idol_id?: number;
  idol_name?: string;
  thumbnail?: string;
  description?: string;
  detail?: string;
  images?: string[];
  tags?: Tag[];
  bio_link?: string[];
}
