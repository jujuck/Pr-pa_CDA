import express from "express";
import LangController from "./lang/Lang.controllers";
import RepoController from "./repo/Repo.controllers";

const router = express.Router();

router.use("/langs", LangController);
router.use("/repos", RepoController);

export default router;
