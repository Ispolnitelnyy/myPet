import { CounterSchema } from "entities/counter/model/types";
import { UserSchema } from "entities/user/model/types";

export interface StateSchema {
   counter: CounterSchema;
   user: UserSchema;
}
