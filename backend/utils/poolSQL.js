import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql
  .createPool({
    host: "0.0.0.0",
    user: "root",
    password: "root",
    database: "asteriaquizz",
    port: 3306,
  })
  .promise();
