export class UserModel {
  constructor({ id, name, email, role = 'user' }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}