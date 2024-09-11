import "reflect-metadata";
import * as dotenv from "dotenv";
import { dataSource } from "./client";
import { Repo } from "../repo/Repo.entities";
import { Status } from "../status/Status.entities";
import { Lang } from "../lang/Lang.entities";

import lang from "./data/lang.json";
import repobyLang from "./data/repo_by_lang.json";
import repos from "./data/repos.json";
import status from "./data/status.json";

dotenv.config();

(async () => {
  try {
    await dataSource.initialize();

    const savedStatus = await Promise.all(
      status.map(async (el) => {
        const status = new Status();
        status.label = el.label;
        return status.save();
      })
    );
    console.log("Status enregistrés avec succès:", savedStatus.length);

    const savedLangs = await Promise.all(
      lang.map(async (el) => {
        const lang = new Lang();
        lang.name = el;
        return lang.save();
      })
    );
    console.log("Langs enregistrées avec succès:", savedLangs.length);

    const savedRepos = await Promise.all(
      repos.map(async (rep) => {
        const repo = new Repo();
        repo.id = rep.id;
        repo.isPrivate = rep.isPrivate;
        repo.url = rep.url;
        repo.name = rep.name;
        repo.langs = repobyLang.reduce((tot: Lang[], el) => {
          if (el.repo_id === rep.id) {
            const mySaveLang = savedLangs.find((_, index) => {
              return index + 1 === el.lang_id
            });
            if (mySaveLang) {
              tot.push(mySaveLang);
            }
          }
          return tot;
        }, [])
        return repo.save();
      })
    );
    console.log("Langs enregistrées avec succès:", savedRepos.length);

    console.log("DB initialized");
  } catch (err) {
    console.error("ERROR while seeding the DB");
    console.error(err.message);
  }
})();
