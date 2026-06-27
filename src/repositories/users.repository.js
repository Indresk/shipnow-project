const User = require('../models/user');

class UserRepository {
  static async create({ name, email, role }) {
    const user = await User.create({
      name,
      email,
      role: role || USER_ROLE.USER,
    });

    return user;
  }
}

module.exports = UserRepository;
