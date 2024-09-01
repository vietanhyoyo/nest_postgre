import { Tag } from 'src/entities/tag';

export interface CreateIdolInput {
  idol_name?: string;
  description?: string;
  detail?: string;
  images?: string[];
  tags?: Tag[];
  bio_link?: string[];
}
