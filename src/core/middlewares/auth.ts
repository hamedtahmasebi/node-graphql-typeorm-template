import type { IAppContext } from "@core/context";
import { ERRORS } from "@core/errors";
import type { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";

export class AuthMiddleware implements MiddlewareInterface<IAppContext> {
    use({ context }: ResolverData<IAppContext>, next: NextFn) {
        if (!context.user) throw ERRORS.FORBIDDEN;
        else return next();
    }
}
