import * as Koa from 'koa';
import RouterGenerator from '../core/RouterGenerator';
import configuration from '../../resources/config';

export default (app: Koa): void => {
	const dirPath: string = __dirname;
	const baseUrl: string = configuration.baseUrl;

	const routerGenerator: RouterGenerator = new RouterGenerator(dirPath, baseUrl);

	routerGenerator.generateRoute(app);
};
