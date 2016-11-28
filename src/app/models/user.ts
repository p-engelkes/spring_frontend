export class User {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public password: string;
  public created: Date;

  create(firstName: string, lastName: string, userName: string, password: string): User {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;

    return this;
  }
}
