import type { User } from "@database/models";
import type { BaseContext } from "@apollo/server";

export interface IAppContext extends BaseContext {
    user: User | null;
}
