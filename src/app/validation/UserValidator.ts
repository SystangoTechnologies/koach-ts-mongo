import { Context, Next } from 'koa';
import { HttpConstants } from '../constant/httpConstants';
import Joi from 'joi';
import { HttpMessages } from '../constant/httpMessages';

export class UserValidator {
	async login(ctx: Context, next: Next): Promise<boolean> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try {
			const reqBodyValidation = Joi.object({
				userName: Joi.string().required(),
				password: Joi.string().min(6).required()
			});

			const reqObj = ctx.request.body;
			const { error } = await reqBodyValidation.validate(reqObj);

			if (error) {
				ctx.status = httpConstants.HTTP_BAD_REQUEST;
				ctx.body = error;
				return;
			}

			return next();
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			return false;
		}
	}

	async createUser(ctx: Context, next: Next): Promise<boolean> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try{
			const reqBodyValidation = Joi.object({
				firstName: Joi.string().regex(/^[a-zA-Z]+$/).required(),
				lastName: Joi.string().regex(/^[a-zA-Z]+$/).required(),
				userName: Joi.string().required(),
				email: Joi.string().email().required(),
				password: Joi.string().min(6).required()
			});

			const reqObj = ctx.request.body;
			const { error } = await reqBodyValidation.validate(reqObj);
			if (error) {
				ctx.status = httpConstants.HTTP_BAD_REQUEST;
				ctx.body = error;
				return;
			}

			return next();
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			return false;
		}
	}

	async updateUser(ctx: Context, next: Next): Promise<boolean> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try{
			const reqBodyValidation = Joi.object({
				firstName: Joi.string().regex(/^[a-zA-Z]+$/),
				lastName: Joi.string().regex(/^[a-zA-Z]+$/),
				userName: Joi.string(),
				email: Joi.string().email()
			});

			const reqObj = ctx.request.body;
			const { error } = await reqBodyValidation.validate(reqObj);
			if (error) {
				ctx.status = httpConstants.HTTP_BAD_REQUEST;
				ctx.body = error;
				return;
			}

			return next();
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			return false;
		}
	}

	async deleteUser(ctx: Context, next: Next): Promise<boolean> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try{
			const reqBodyValidation = Joi.object({
				userId: Joi.string().required()
			});

			const reqObj = ctx.params;
			const { error } = await reqBodyValidation.validate(reqObj);
			if (error) {
				ctx.status = httpConstants.HTTP_BAD_REQUEST;
				ctx.body = error;
				return false;
			}

			return next();
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			return false;
		}
	}

	async changePassword(ctx: Context, next: Next): Promise<boolean> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try{
			const reqBodyValidation = Joi.object({
				oldPassword: Joi.string().min(6).required(),
				newPassword: Joi.string().min(6).required()
			});

			const reqObj = ctx.request.body;
			const { error } = await reqBodyValidation.validate(reqObj);
			if (error) {
				ctx.status = httpConstants.HTTP_BAD_REQUEST;
				ctx.body = error;
				return;
			}

			return next();
		} catch (err) {
			ctx.status = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
			ctx.body = { message: httpMessages.INTERNAL_SERVER_ERROR };
			return false;
		}
	}
}

export default UserValidator;
