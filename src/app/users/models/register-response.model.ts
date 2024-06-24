import {User} from "./user.model";

export interface RegisterResponse {
  token: string,
  user: User
}
