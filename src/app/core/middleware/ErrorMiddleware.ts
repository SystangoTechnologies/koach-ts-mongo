import { Context, Next } from 'koa';
class ErrorMiddleware {
	errorMiddleware() {
		return async (ctx: Context, next: Next): Promise<any> => {
			try {
				await next();
			} catch (err) {
				ctx.status = err.status || 500;
				ctx.body = err.message;
				ctx.app.emit('error', err, ctx);
			}
		};
	}
}

export default ErrorMiddleware;
