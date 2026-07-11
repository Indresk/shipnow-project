const User = require('../models/user');
const { USER_ROLES } = require('../constants');

class UserRepository {
	static async create({ name, email, role }) {
		const user = await User.create({
			name,
			email,
			role: role || USER_ROLES.USER,
		});

		return user;
	}

	static async findAll() {
		const users = await User.find();
		return users;
	}

	static async findById(id) {
		const user = await User.findById(id);
		return user;
	}
}

module.exports = UserRepository;
