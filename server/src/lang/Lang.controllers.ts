import express, { Response } from "express";
import Lang from "./Lang.models";

const LangController = express.Router();
LangController.get('/', async (_: unknown, res: Response) => {
  try {
    const categories = await Lang.readAll();
    res.status(200).json(categories)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default LangController