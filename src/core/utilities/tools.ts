// Imports
import crypto from "crypto";
import { unwrapResolverError } from "@apollo/server/errors";
import { GraphQLError, type GraphQLFormattedError } from "graphql";
import { ArgumentValidationError } from "type-graphql";
import { TypeORMError } from "typeorm";

import { PASSWORD_ENCRYPTION_SECRET_KEY } from "./config";
import { ERRORS } from "@core/errors";

// Tools
export const Tools = {
    hash: (input: string) =>
        crypto
            .createHmac("sha256", PASSWORD_ENCRYPTION_SECRET_KEY)
            .update(input)
            .digest("hex"),

    delay: async (ms: number) =>
        new Promise((res) => {
            setTimeout(() => {
                res(null);
            }, ms);
        }),

    formatError: (
        formattedError: GraphQLFormattedError,
        error: unknown
    ): GraphQLFormattedError => {
        // Unwrapping the original error
        const originalError = unwrapResolverError(error) as Record<
            string,
            unknown
        >;

        // Check if the Error is an instance of Argument Validation Error or not
        // This also includes the class-validator error messages

        console.log({
            originalError,
            error,
        });

        if (originalError instanceof GraphQLError) {
            return {
                message: originalError.message,
                extensions: originalError.extensions,
                locations: originalError.locations,
                path: originalError.path,
            };
        }

        if (originalError instanceof ArgumentValidationError) {
            return {
                message: ERRORS.ARG_VALIDATION_ERROR.message,
            };
        }

        // Check if the error is an instance of the database errors or not
        // Due to the security this one is the most important one and we just send a vague thing like "Internal Server Error"
        if (originalError instanceof TypeORMError)
            return {
                message: ERRORS.INTERNAL_SERVER_ERROR.message,
            };
        // And finally, just to make sure that we have covered all the cases:

        if (!originalError?.message)
            return {
                message: ERRORS.INTERNAL_SERVER_ERROR.message,
            };
        return {
            message: ERRORS.INTERNAL_SERVER_ERROR.message,
        };
    },
};
