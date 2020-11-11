import glob from 'glob';
import Koa from 'koa';
import Router from 'koa-router';

export default class RouterGenerator {

	constructor(private dirPath: string, private baseUrl: string) {
	}
	generateRoute(app: Koa): void {
		glob(`${this.dirPath}/*`, { ignore: ['**/index.js', '**/index.ts'] }, (err: Error, modules: string[]) => {
			if (err) {
				return;
			}
			modules.forEach((module: string) => {
				const routerManager = require(module).default;
				const router: Router = new Router({ prefix: this.baseUrl });
				router.use(routerManager.getRoutes());
				app.use(router.routes());
			});
		});
	}
}
