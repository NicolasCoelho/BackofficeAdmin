import { Payment } from "./payment";
import { User } from "./user";

export class PaginetedList {
  public totalItems: number;
  public totalPages: number;
  public pageSize: number;
  public currentPage: number;
  public items: Array<User | Payment | any>;
}
