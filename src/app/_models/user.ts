export class User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public status: number;
  public type: number;
  public createdAt: string;
  public updatedAt: string;
}

export class UserPaginated {
  public totalItems: number;
  public totalPages: number;
  public pageSize: number;
  public currentPage: number;
  public items: Array<User>;
}
