import { User } from "@shared/data/models/user";

export interface DocumentNote {
  id: number;
  created?: Date;
  note?: string;
  user?: User;
}
