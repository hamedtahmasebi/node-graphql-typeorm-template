import fs from "fs";
import * as dotenv from "dotenv";
import type jwt from "jsonwebtoken";
import path from "path";

if (process.env.NODE_ENV === "local" && fs.existsSync("./.env.local")) {
    console.log(`Using .env.local variables`);
    dotenv.config({ path: path.resolve("./.env.local") });
} else if (process.env.NODE_ENV === "production") {
    console.log(`Using .env.production variables`);
    dotenv.config({ path: path.resolve("./.env.production") });
} else {
    console.log(`Using .env variables`);

    dotenv.config();
}

export const MIN_PASSWORD_LENGTH = 8;
export const JWT_OPTIONS: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn: "30d",
};

export const {
    APP_PORT,
    PASSWORD_ENCRYPTION_SECRET_KEY,
    JWT_SECRET_KEY,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    OTP_PROVIDER_API_KEY,
} = process.env;
