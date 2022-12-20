import dotenv from 'dotenv';
dotenv.config();

// PostGres DB connection
const databaseConfig = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'postgres',
  PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_DATA: process.env.DB_DATA_NAME || 'postgres',
  DB_AUTH: process.env.DB_AUTH_NAME || 'postgres',
  dialect: 'postgres',
  PM_SECRET: process.env.PM_SECRET || 'pm-secret-key',
  PM_REFRESH_SECRET: process.env.PM_REFRESH_SECRET || 'pm-refresh-secret',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

export default databaseConfig