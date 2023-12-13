import pg from "pg";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config as dotenvConfig } from "dotenv";

// Importer le module path
import path from "path";

// Convertir l'URL du module en chemin de fichier
const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construire le chemin absolu vers le fichier .env
const envPath = path.resolve(__dirname, "../.env");

// Charger les variables d'environnement depuis le fichier .env
dotenvConfig({ path: envPath });

// Configurer le pool PostgreSQL
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

// Fonction pour exécuter les requêtes SQL
export const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};
