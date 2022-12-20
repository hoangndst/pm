import dotenv from 'dotenv';
dotenv.config();
// PostGres DB connection
const databaseConfig = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'hoangndst',
  PASSWORD: process.env.DB_PASSWORD || 'Hoang2002',
  DB_DATA: process.env.DB_DATA_NAME || 'pm',
  DB_AUTH: process.env.DB_AUTH_NAME || 'pmAuthorization',
  dialect: 'postgres',
  PM_SECRET: process.env.PM_SECRET || 'pm-secret',
  PM_REFRESH_SECRET: process.env.PM_REFRESH_SECRET || 'pm-refresh-secret',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

export default databaseConfig