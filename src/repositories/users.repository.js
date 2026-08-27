import User from '../models/user.js';
import { USER_ROLES } from '../constants/index.js';

class UserRepository {
	static async getAll() {
		const users = await User.find();
		return users;
	}

	static async getById(id) {
		const user = await User.findById(id);
		return user;
	}

	static async create({ name, email, role }) {
		const user = await User.create({
			name,
			email,
			role: role || USER_ROLES.USER,
		});

		return user;
	}

	static async insertMany(users) {
		const newUsers = await User.insertMany(users);
		return newUsers;
	}

	static async addDoc(id, fileInfo) {
		const userUpdated = await User.findByIdAndUpdate(
			id,
			{
				$push: {
					documents: fileInfo,
				},
			},
			{ new: true },
		).lean();
		return userUpdated;
	}
}

export default UserRepository;
