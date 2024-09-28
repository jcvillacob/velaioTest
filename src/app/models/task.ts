import { Person } from "./person";

export interface Task {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  people: Person[];
}
