import { Person } from "./person";

export interface Task {
  id: number;
  nombre: string;
  fechaLimite: Date;
  completada: boolean;
  personas: Person[];
}
