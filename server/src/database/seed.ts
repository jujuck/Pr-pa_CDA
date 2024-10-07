import "reflect-metadata";
import * as dotenv from "dotenv";
import { dataSource } from "./client";
import { Repo } from "../repo/Repo.entities";
import { Status } from "../status/Status.entities";
import { Lang } from "../lang/Lang.entities";
import { Comment } from "../comment/Comment.entities";

import lang from "./data/lang.json";
import repobyLang from "./data/repo_by_lang.json";
import repos from "./data/repos.json";
import status from "./data/status.json";

dotenv.config();

(async () => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    await queryRunner.query(
      `UPDATE comment SET repoId = NULL WHERE repoId IS NOT NULL;`
    );
    await queryRunner.query(`DELETE FROM repo_langs_lang`);
    await queryRunner.query(`DELETE FROM lang`);
    await queryRunner.query(`DELETE FROM repo`);
    await queryRunner.query(`DELETE FROM status`);

    await queryRunner.query(
      `DELETE FROM sqlite_sequence WHERE name='status' OR name='repo' OR name='lang'`
    );

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

    const comments = await Comment.find();
    const savedRepos = await Promise.all(
      repos.map(async (rep) => {
        const repo = new Repo();
        repo.gitHubKey = rep.id;
        repo.isPrivate =
          savedStatus.find((status: Status) => status.id === rep.isPrivate) ||
          savedStatus[0];
        repo.url = rep.url;
        repo.name = rep.name;
        repo.comments = comments.reduce((tot: Comment[], el) => {
          if (el.gitHubKey === rep.id) {
            tot.push(el);
            return tot;
          }
          return tot;
        }, []);
        repo.langs = repobyLang.reduce((tot: Lang[], el) => {
          if (el.repo_id === rep.id) {
            const mySaveLang = savedLangs.find((_, index) => {
              return index + 1 === el.lang_id;
            });
            if (mySaveLang) {
              tot.push(mySaveLang);
            }
          }
          return tot;
        }, []);
        return repo.save();
      })
    );
    console.log("Langs enregistrées avec succès:", savedRepos.length);

    const synchroComment = await Promise.all(
      comments.map(async (comment) => {
        const repo = savedRepos.find(
          (repo: Repo) => repo.gitHubKey === comment.gitHubKey
        );
        return await Comment.update(comment.id, {
          repo: repo,
        });
      })
    );

    console.log("Comments synchronisé avec succès:", synchroComment.length);

    console.log("Synchro réalisée avec succès:");
    await queryRunner.commitTransaction();

    console.log("DB initialized");
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error("ERROR while seeding the DB");
    console.error(err.message);
  } finally {
    await queryRunner.release();
  }
})();
