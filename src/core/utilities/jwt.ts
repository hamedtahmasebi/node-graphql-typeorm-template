import jwtPackage from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_OPTIONS } from "./config";

export const jwt = {
    sign: (input: string, secret = JWT_SECRET_KEY, options = JWT_OPTIONS) =>
        jwtPackage.sign({ token: input }, secret, options),
    verify: (
        input: string,
        secret = JWT_SECRET_KEY,
        options = JWT_OPTIONS
    ): string | null => {
        try {
            const verification = jwtPackage.verify(input, secret, options);

            const { token } = verification;
            if (token) return token;
            return null;
        } catch (error) {
            return null;
        }
    },
};
