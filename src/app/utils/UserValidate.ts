import { HttpConstants } from '../constant/httpConstants';
import { HttpMessages } from '../constant/httpMessages';
import { Context } from 'koa';

export class UserValidate {
	preCondition (ctx: Context): boolean {
		const httpConstants: HttpConstants = new HttpConstants();
		const httpMessages: HttpMessages = new HttpMessages();
		const isVerified = String(ctx.state.user._id) === String(ctx.params.userId);
		if (!isVerified) {
			ctx.status = httpConstants.HTTP_FORBIDDEN;
			ctx.body = { message: httpMessages.NOT_ALLOWED };
			return false;
		}
		return true;
	}
}
