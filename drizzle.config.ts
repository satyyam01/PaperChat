// drizzle.config.ts
import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
    schema: 'src/lib/db/schema.ts',
    dbCredentials: {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!) || 5432,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
        ssl: process.env.DB_SSL === 'true', // Convert 'true' to boolean
    },
    dialect: 'postgresql',
} satisfies Config;
