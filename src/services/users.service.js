const UserRepository = require('../repositories/users.repository');

class UserService {
  static async create({ name, email, role }) {
    if (!name || !email) {
      throw new Error('Faltan datos obligatorios del usuario');
    }

    // TODO: validar rol si es correcto

    const user = await UserRepository.create({ name, email, role });

    return user;
  }
}

module.exports = UserService;
