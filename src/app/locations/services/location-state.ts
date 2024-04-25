import {Location} from "../models/location.model";

export interface LocationState {
  locations: Location[],
  loading: boolean,
  error: string | null
}
