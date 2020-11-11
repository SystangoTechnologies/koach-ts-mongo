import { Context } from 'koa';

export class TokenObject {
	getToken(ctx: Context): string|null {
		const header: string = ctx.request.headers.authorization;
		if (!header) {
			return null;
		}

		const parts = header.split(' ');
		if (parts.length !== 2) {
			return null;
		}
		const scheme: string = parts[0];
		const token: string = parts[1];
		if (/^Bearer$/i.test(scheme)) {
			return token;
		}
		return null;
	}
}
