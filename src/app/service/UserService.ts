import User, { UserInstance } from '../db/entity/library/user';

export class UserService {
	login(userName: string): Promise<UserInstance> {
		return User.findOne({
			$or: [
				{ userName: userName },
				{ email: userName }
			]
		});
	}
	async createUser(firstName: string, lastName: string, userName: string, email: string, password: string): Promise<void> {
		const user: UserInstance = new User({
			firstName: firstName,
			lastName: lastName,
			userName: userName,
			email: email,
			password: password
		});
		await user.save();
	}
	async getUser(userId: string): Promise<UserInstance> {
		return User.findOne({
			_id: userId
		});
	}
	async updateUser(userId: string, body: UserInstance): Promise<void> {
		body._id && delete body._id;
		body.password && delete body.password;
		await User.findByIdAndUpdate(userId, { $set: body });
	}
	async deleteUser(userId: string): Promise<any> {
		return User.findOneAndRemove({ _id: userId });
	}
	async changePassword(userId: string, newPassword: string, oldPassword: string): Promise<boolean> {
		const user: UserInstance = await User.findOne({
			_id: userId
		});

		const isMatch = await user.validatePassword(oldPassword);
		if (isMatch) {
			user.password = newPassword;
			await user.save();
			return true;
		}
		return false;
	}
}
