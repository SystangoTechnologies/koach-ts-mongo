import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import logger from 'koa-logger';
import mount from 'koa-mount';
import serve from 'koa-static';
import helmet from 'koa-helmet';
import { Middleware } from 'koa-compose';
import http2 from 'http2';
import fs from 'fs';
import ErrorMiddleware from '../app/core/middleware/ErrorMiddleware';
import CreateDatabaseConnection from '../app/db/entity/library';
import config from '../resources/config';
import routes from '../app/routes';

const app: Koa = new Koa();
const errorMiddleware: ErrorMiddleware = new ErrorMiddleware();
const createDatabaseConnection: CreateDatabaseConnection = new CreateDatabaseConnection();

// create db connection
createDatabaseConnection.connect();

// Loading certificates
const options: http2.SecureServerOptions = {
	cert: fs.readFileSync(`${process.cwd()}/src/resources/cert/localhost.crt`),
	key: fs.readFileSync(`${process.cwd()}/src/resources/cert/localhost.key`),
	allowHTTP1: true
};

const _use = app.use;
app.use = (x: Middleware<any>) => _use.call(app, convert(x));

app.use(helmet());
app.use(logger());
app.use(bodyParser({formLimit: '200mb', jsonLimit: '200mb'}));
app.use(errorMiddleware.errorMiddleware());
app.use(mount('/images', serve(`${process.cwd()}/images`)));

routes(app);

// show swagger only if the NODE_ENV is development and staging
if (['development', 'staging'].includes(config.environment)) {
	app.use(mount('/swagger', serve(`${process.cwd()}/src/resources/swagger`)));
}

http2
	.createSecureServer(options, app.callback())
	.listen(config.port, () => {
		console.log(`Server started on ${config.port}`);
	});
