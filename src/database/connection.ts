import "reflect-metadata";

import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USERNAME,
} from "@core/utilities/config";
import { DataSource } from "typeorm";

import { User } from "@database/models";

if (!DB_HOST || !DB_PASSWORD || !DB_USERNAME || !DB_NAME || !DB_PORT)
    throw Error("Could not find environment variables");

const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    ssl: false,
    port: parseInt(DB_PORT, 10),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: false,
    synchronize: true,
    entities: [User],
    migrations: [],
    subscribers: [],
});

export { AppDataSource };
