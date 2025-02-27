import { GraphQLError } from "graphql";

enum E_ErrorCodes {
    NOT_FOUND = "NOT_FOUND",
    FORBIDDEN = "FORBIDDEN",
    INVALID_REQUEST = "INVALID_REQUEST",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    ARG_VALIDATION_ERROR = "ARG_VALIDATION_ERROR",
    DUPLICATE_RECORD = "DUPLICATE_RECORD",
}

const NOT_FOUND = new GraphQLError(E_ErrorCodes.NOT_FOUND);

const FORBIDDEN = new GraphQLError(E_ErrorCodes.FORBIDDEN);

const ARG_VALIDATION_ERROR = new GraphQLError(
    E_ErrorCodes.ARG_VALIDATION_ERROR
);

const INTERNAL_SERVER_ERROR = new GraphQLError(
    E_ErrorCodes.INTERNAL_SERVER_ERROR
);

const DUPLICATE_RECORD = new GraphQLError(E_ErrorCodes.DUPLICATE_RECORD);

export const ERRORS = {
    NOT_FOUND,
    FORBIDDEN,
    ARG_VALIDATION_ERROR,
    INTERNAL_SERVER_ERROR,
    DUPLICATE_RECORD,
};
