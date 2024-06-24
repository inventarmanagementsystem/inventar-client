import {User} from "../models/user.model";

export interface UserState {
  token: string | null,
  user: User | null,
  loading: boolean,
  error: string | null
}
