import { StatusUser } from 'src/common/enum/user.enum';

export interface UpdateUserInput {
  user_id?: number;
  user_name?: string;
  password?: string;
  status?: StatusUser;
  roles?: string[];
}
