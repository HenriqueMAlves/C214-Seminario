
var user: Array<User> = new Array<User>;

export class User {
  private name: String;
  private email: String;
  private password: String;

  constructor(name: String, email: String, password: String) { 
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public getName(): String{
    return this.name;
  }

  public getEmail(): String{
    return this.email;
  }

  public getPassword(): String{
    return this.password;
  }

  public setName(name: String): void{
    this.name = name;
  }

  public setEmail(email: String): void{
    this.email = email;
  }

  public setPassword(password: String): void{
    this.email = password;
  }

}

export default user;