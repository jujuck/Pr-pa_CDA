import type { Lang } from "./Lang";

export type Repo = {
  id: string;
  name: string;
  url: string;
  langs: [Lang];
};