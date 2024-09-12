import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repo/Repo.entities";
import { Lang } from "../lang/Lang.entities";
import { Status } from "../status/Status.entities"

dotenv.config();

// const { BACKEND_DBFILE } = process.env;

// export const dataSource = new DataSource({
//   type: "sqlite",
//   database: `${BACKEND_DBFILE}`,
//   entities: [Repo, Lang, Status],
//   synchronize: true,
// });

const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } = process.env;

export const dataSource= new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  entities: [Repo, Lang, Status],
});