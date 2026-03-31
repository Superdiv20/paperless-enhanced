import { User } from "@shared/data/models/user";

export type DocumentNote = {
  id: number;
  created?: Date;
  note?: string;
  user?: User;
}
