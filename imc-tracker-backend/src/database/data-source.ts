import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "imc-tracker-database.sqlite"),
  synchronize: false,
  migrations: [path.join(__dirname, "migrations", "*.ts")],
  logging: false,
  entities: [path.join(__dirname, "../models/*.ts")],
});
