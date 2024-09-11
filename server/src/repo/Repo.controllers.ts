import express, { Response } from "express";
import Repo from "./Repo.models"

const RepoController = express.Router();
RepoController.get('/', async (_: unknown, res: Response) => {
  try {
    const repos = await Repo.readAll();
    res.status(200).json(repos)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default RepoController