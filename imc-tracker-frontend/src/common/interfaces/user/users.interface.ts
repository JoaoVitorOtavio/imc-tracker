import { User } from "./user.interface";

export interface Users {
  data: User[];
  total: number;
  currentPage?: number;
  totalPages?: number;
}
