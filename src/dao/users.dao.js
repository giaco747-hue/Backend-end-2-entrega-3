import { userModel } from '../models/user.model.js';

export class UsersDAO {
  async getByEmail(email) {
    return await userModel.findOne({ email });
  }

  async create(userData) {
    return await userModel.create(userData);
  }
}