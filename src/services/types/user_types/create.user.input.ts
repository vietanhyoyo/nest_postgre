import Role from "src/common/enum/role.enum";
import { StatusUser } from "src/common/enum/user.enum";

export interface CreateUserInput {
  user_name: string;
  password: string;
  email: string;
  status: StatusUser;
  role: Role;
}
