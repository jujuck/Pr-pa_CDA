const fs = require("fs");

(async () => {
  const raw = await JSON.parse(
    fs.readFileSync("./raw.json", { encoding: "utf8" })
  );

  const repos = raw.map((el) => ({
    id: el.id,
    isPrivate: !el.isPrivate ? 1 : 2,
    name: el.name,
    url: el.url,
  }));

  const langs = [];
  const repo_by_lang = [];
  raw.forEach((el) => {
    el.languages.forEach((lang) => {
      if (!langs.includes(lang.node.name)) {
        langs.push(lang.node.name);
      }
      const ind = langs.indexOf(lang.node.name);
      repo_by_lang.push({
        repo_id: el.id,
        lang_id: ind + 1,
        size: lang.size,
      });
    });
  });

  await fs.writeFile(
    `./data/repos.json`,
    JSON.stringify(repos, null, 2),
    (err) =>
      err
        ? console.error("Data not written!", err)
        : console.info("Data correctly merge in json file")
  );

  await fs.writeFile(
    `./data/lang.json`,
    JSON.stringify(langs, null, 2),
    (err) =>
      err
        ? console.error("Data not written!", err)
        : console.info("Data correctly merge in json file")
  );

  await fs.writeFile(
    `./data/repo_by_lang.json`,
    JSON.stringify(repo_by_lang, null, 2),
    (err) =>
      err
        ? console.error("Data not written!", err)
        : console.info("Data correctly merge in json file")
  );

  await fs.writeFile(
    `./data/status.json`,
    JSON.stringify(
      [
        { id: 1, label: "public" },
        { id: 2, label: "privée" },
      ],
      null,
      2
    ),
    (err) =>
      err
        ? console.error("Data not written!", err)
        : console.info("Data correctly merge in json file")
  );
})();
