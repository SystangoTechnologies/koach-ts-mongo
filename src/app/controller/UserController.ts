import { Context } from 'koa';
import logger from '../../logger';
import { HttpConstants } from '../constant/httpConstants';
import { HttpMessages } from '../constant/httpMessages';
import { UserService } from '../service/UserService';
import { UserModel } from '../model/User';
import { UserValidate } from '../utils/UserValidate';
import { UserInstance } from '../db/entity/library/user';

export class UserController {
	async login(ctx: Context): Promise<void> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try {
			const { userName, password } = ctx.request.body;
			logger.info(`Controller : login, Request-Body : ${JSON.stringify(userName)}`);
			const userService: UserService = new UserService();
			const user: UserInstance = await userService.login(userName);
			if (!user) {
				ctx.status = httpConstants.HTTP_UNAUTHORIZED;
				ctx.body = { message: httpMessages.INVALID_LOGIN_PASSWORD };
				return;
			}
			// validate the password
			const isMatch = await user.validatePassword(password);
			if (!isMatch) {
				ctx.status = httpConstants.HTTP_UNAUTHORIZED;
				ctx.body = { message: httpMessages.INVALID_LOGIN_PASSWORD };
				return;
			}
			const token: string = user.generateToken();
			ctx.append('Authorization', token);
			const userModelData: UserModel = new UserModel();
			delete userModelData.password;
			userModelData.setId(user._id);
			userModelData.setFirstName(user.firstName);
			userModelData.setLastName(user.lastName);
			userModelData.setUserName(user.userName);
			userModelData.setEmail(user.email);
			ctx.body = userModelData;
			ctx.status = httpConstants.HTTP_SUCCESS_OK;
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
		}
	}
	async createUser(ctx: Context): Promise<void> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try {
			const { firstName, lastName, userName, email, password } = ctx.request.body;
			logger.info(`Controller : createUser, Request-Body : ${JSON.stringify(email)}`);
			const userService: UserService = new UserService();
			await userService.createUser(firstName, lastName, userName, email, password);
			ctx.status = httpConstants.HTTP_CREATED;
			ctx.body = { message: httpMessages.CREATED_SUCCESSFULLY };
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			logger.error(`Controller : createUser, Error : ${JSON.stringify(err)}`);
		}
	}
	async getUser(ctx: Context): Promise<void> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try {
			const userValidate: UserValidate = new UserValidate();
			if (!userValidate.preCondition(ctx)) { return; }
			const userService: UserService = new UserService();
			const getUserData: UserInstance = await userService.getUser(ctx.params.userId);
			if (!getUserData) {
				ctx.body = { message: httpMessages.USER_DOES_NOT_EXIST };
				ctx.status = httpConstants.HTTP_REQUESTED_RESOURCE_NOT_FOUND;
				return;
			}
			const user: UserModel = new UserModel();
			delete user.password;
			if (getUserData) {
				user.setId(getUserData._id);
				user.setFirstName(getUserData.firstName);
				user.setLastName(getUserData.lastName);
				user.setUserName(getUserData.userName);
				user.setEmail(getUserData.email);
			}
			ctx.body = user;
			ctx.status = httpConstants.HTTP_SUCCESS_OK;
			logger.info(`Controller : getUser, Response-Body : ${JSON.stringify(ctx.body)}`);
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			logger.error(`Controller : getUser, Error : ${JSON.stringify(err)}`);
		}
	}
	async updateUser(ctx: Context): Promise<void> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try {
			const userValidate: UserValidate = new UserValidate();
			if (!userValidate.preCondition(ctx)) { return; }
			const userService: UserService = new UserService();
			await userService.updateUser(ctx.params.userId, ctx.request.body);
			ctx.body = { message: httpMessages.UPDATE_SUCCESS };
			ctx.status = httpConstants.HTTP_SUCCESS_OK;
			logger.info(`Controller : updateUser, Response-Body : ${JSON.stringify(ctx.request.body)}, userId: ${ctx.params.userId}`);
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			logger.error(`Controller : getUser, Error : ${JSON.stringify(err)}`);
		}
	}
	async deleteUser(ctx: Context): Promise<void> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try {
			const userValidate: UserValidate = new UserValidate();
			if (!userValidate.preCondition(ctx)) { return; }
			const userService: UserService = new UserService();
			await userService.deleteUser(ctx.params.userId);
			ctx.status = httpConstants.HTTP_SUCCESS_OK;
			ctx.body = { message: httpMessages.DELETE_SUCCESS };
			logger.info(`Controller : deleteUser, Request-Params : ${JSON.stringify(ctx.params)}`);
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			logger.error(`Controller : deleteUser, Error : ${JSON.stringify(err)}`);
		}
	}
	async changePassword(ctx: Context): Promise<void> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try {
			const { oldPassword, newPassword } = ctx.request.body;
			const userService: UserService = new UserService();
			const isUpdated: boolean = await userService.changePassword(String(ctx.state.user._id), newPassword, oldPassword);
			if (!isUpdated) {
				ctx.body = { message: httpMessages.WRONG_OLD_PASSWORD };
				ctx.status = httpConstants.HTTP_UNPROCESSABLE_ENTITY;
				return;
			}
			ctx.body = { message: httpMessages.UPDATE_SUCCESS };
			ctx.status = httpConstants.HTTP_SUCCESS_OK;
			logger.info(`Controller : Change Password, Request-Body : ${JSON.stringify(ctx.state.user._id)}`);
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			logger.error(`Controller : changePassword, Error : ${JSON.stringify(err)}`);
		}
	}
}
