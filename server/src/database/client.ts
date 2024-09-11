import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repo/Repo.entities";
import { Lang } from "../lang/Lang.entities";
import { Status } from "../status/Status.entities"

dotenv.config();

const { BACKEND_DBFILE } = process.env;

export const dataSource = new DataSource({
  type: "sqlite",
  database: `${BACKEND_DBFILE}`,
  entities: [Repo, Lang, Status],
  synchronize: true,
});

// const { DB_PASSWORD, DB_DATABASE, DB_USER, DB_HOST } = process.env;

// export const dataSource= new DataSource({
//   type: 'sqlite',
//   host: DB_HOST,
//   port: 5432,
//   username: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_DATABASE,
//   synchronize: true,
//   entities: [Repo, Lang, Status],
// });