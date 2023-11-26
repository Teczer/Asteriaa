import mysql from "mysql2";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config as dotenvConfig } from "dotenv";

// Importer le module path
import path from "path";

// Convertir l'URL du module en chemin de fichier
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construire le chemin absolu vers le fichier .env
const envPath = path.resolve(__dirname, "../.env");

// Charger les variables d'environnement depuis le fichier .env
dotenvConfig({ path: envPath });

export const pool = mysql
  .createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
  })
  .promise();
