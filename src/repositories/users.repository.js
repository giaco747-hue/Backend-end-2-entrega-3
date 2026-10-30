import { UsersDAO } from '../dao/users.dao.js';

const usersDao = new UsersDAO();

export class UsersRepository {
  async getUserByEmail(email) {
    return await usersDao.getByEmail(email);
  }

  async createUser(userData) {
    return await usersDao.create(userData);
  }
}