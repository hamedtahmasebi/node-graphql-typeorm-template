import type { BaseContext } from "@apollo/server";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { APP_PORT, DB_HOST, DB_PORT, Tools, jwt } from "@core/utilities";
import { AppDataSource } from "@database/connection";
import { User } from "@database/models";

import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "@app/Resolvers/User";
import { ERRORS } from "@core/errors";

interface I_ApolloContext extends BaseContext {}

export const startServer = async () => {
    await AppDataSource.initialize()
        .then(() =>
            console.log(
                `${new Date().toString()}: Connected to DB successfully on ${DB_HOST}:${DB_PORT}`
            )
        )
        .catch((err) =>
            console.log(
                `${new Date().toString()}: Error connecting to DB:`,
                err
            )
        );

    const schema = await buildSchema({
        // Do NOT use glob patterns for getting resolvers
        // Here is why: https://github.com/MichalLytek/type-graphql/issues/1147
        resolvers: [UserResolver],
        validate: {
            forbidUnknownValues: false,
        },
    });

    const server = new ApolloServer<I_ApolloContext>({
        schema,
        formatError: Tools.formatError,
    });

    await server.start();

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req }) => {
                try {
                    const { authorization } = req.headers;
                    if (!authorization) throw ERRORS.FORBIDDEN;

                    const token = jwt.verify(authorization);

                    if (token) {
                        const user = await User.findOneOrFail({
                            where: {
                                token,
                            },
                        });
                        return {
                            user,
                        };
                    }
                    throw ERRORS.FORBIDDEN;
                } catch (error) {
                    return {
                        user: null,
                    };
                }
            },
        })
    );

    app.listen(APP_PORT, () =>
        console.log(
            `${new Date().toString()}: Started server at http://localhost:${APP_PORT}/graphql`
        )
    );
};

startServer();
