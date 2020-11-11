import { HttpConstants } from '../../constant/httpConstants';
import { HttpMessages } from '../../constant/httpMessages';
import { verify } from 'jsonwebtoken';
import { Context, Next } from 'koa';
import envDev from '../../../resources/config/env.development';
import User from '../../db/entity/library/user';
import { TokenObject } from '../../utils/getToken';

export class EnsureUser {
	async ensureUser(ctx: Context, next: Next): Promise<void> {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		try {
			const tokenObject: TokenObject = new TokenObject();
			const token: string|null = tokenObject.getToken(ctx);
			if (!token) {
				throw new Error();
			}
			let decoded = null;

			decoded = verify(token, envDev.token);
			ctx.state.user = await User.findOne({
				_id: decoded.id
			},
			{ 'password': 0 });

			if (!ctx.state.user) {
				throw new Error();
			}

			return next();

		} catch (error) {
			ctx.status = httpConstants.HTTP_UNAUTHORIZED;
			ctx.body = { message: httpMessages.UNAUTHORIZED };

		}
	}
}
