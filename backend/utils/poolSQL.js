import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql
  .createPool({
    host: "localhost:5001",
    user: "root",
    password: "root",
    database: "asteriaquizz",
  })
  .promise();
