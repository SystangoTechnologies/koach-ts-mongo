![KOACH](https://github.com/SystangoTechnologies/Koach/raw/master/static/koach.png)

## KOACH-Typescript-Mongodb
Production ready boilerplate for building APIs in [Typescript(4.0.3)](https://www.typescriptlang.org/) with [koa2](https://github.com/koajs/koa/), and using NoSQL database and http/2 as the communication protocol.


## Features
* Object oriented
* Typescript
* Authentication (JWT)
* http/2 support
* Mongoose ORM
* Swagger
* ESlint linting with typescript-eslint plugin and parser
* Dockerized Version

Please note, This boilerplate is for the API only application.

Visit `https://localhost:3000/` to access the root page.

## Requirements
* Node v10.16.0 or higher
* MongoDB
* Docker

## Environment Variables Configuration
To simulate environment variables
#### Dev environment *(use anyone)*
- src/resources/config/env.development.ts
- .env file

####  Production environment
- /etc/environment file

The environment variables are as follows -
```
NODE_ENV=production                                 // Environment development/production
SERVER_PORT=3000                                    // Server's Port
SESSION=secret_key                                  // secret-boilerplate-token
TOKEN=token                                         // Jwt secret key for Jwt token
DATABASE_URL=mongodb://localhost:27017/koachmongodb // Database url to connect database
```

## Installation
```bash
git clone https://github.com/SystangoTechnologies/Koach-Typescript-Mongodb.git
```

## Modules Used
* [koa2](https://github.com/koajs/koa)
* [koa-router](https://github.com/alexmingoia/koa-router)
* [koa-bodyparser](https://github.com/koajs/bodyparser)
* [koa-generic-session](https://github.com/koajs/generic-session)
* [koa-logger](https://github.com/koajs/logger)
* [koa-helmet](https://github.com/venables/koa-helmet)
* [koa-convert](https://github.com/koajs/convert)
* [http/2](https://github.com/molnarg/node-http2)
* [Swagger](https://github.com/swagger-api/)
* [grunt](https://github.com/gruntjs/grunt)
* [typescript](https://github.com/Microsoft/TypeScript)
* [dotenv](https://github.com/motdotla/dotenv)
* [winston](https://github.com/winstonjs/winston)
* [mongoose](https://mongoosejs.com/)
* [mongodb](https://www.mongodb.com/)
* [Joi](https://joi.dev/api/)
## Structure
```
│   .gitignore                                      // Standard git ignore file
|   .env                                            // dotenv configuration file for environment variable
│   docker-compose.yml                              // Standard docker compose file
│   Dockerfile                                      // Standard docker file
│   gruntfile.js                                    // Standard  gruntfile.js file
│   package.json                                    // Standard package.json file
│   README.md
│   .eslintrc                                       // Eslint rules file
│   .eslintignore                                   // Eslint Ignore file
├───log                                             // logs directory
└───src                                             // source code
    │
    ├───app
    │   ├───constant                                // constants
    │   │       httpConstants.ts                    // http status code constant file
    │   │       httpMessages.ts                     //  http messages constant file
    │   │
    │   ├───controller                              // controller
    │   │       UserController.ts
    │   │
    │   ├───core
    │   │   │   RouterGenerator.ts                  // Generating all routes
    │   │   │   RouterManager.ts                    // Route depedency
    │   │   │
    │   │   └───middleware                          // middlewares
    │   │           ErrorMiddleware.ts 
    │   │           EnsureUser.ts
    │   │
    │   ├───db
    │   │   │   DatabaseConfigurationManager.ts
    │   │   │
    │   │   ├───entity                              // entities
    │   │   |   ├───library
    │   │   |   │       user.ts                     // user entity
    │   │   |   │       index.ts
    │   │   └───repository                          // repository
    │   │   
    │   ├───model
    │   │       User.ts                             // user model
    │   │ 
    │   ├───routes                                  // router
    │   │       UserRouter.ts
    │   │       index.ts
    │   │
    │   ├───service                                 // Service file for database
    │   │       UserService.ts
    │   │

    │   ├───utils                                 // Service file for database
    │   │       getToken.ts
    │   │       UserValidate.ts
    │   │
    │   └───validation                              // validations
    │           UserValidator.ts
    │
    ├───logger                                      // logger file.
    │      index.ts
    │      LogManager.ts
    │
    ├───resources                                   // resources
    │   ├───config                                  //  configuration setting
    │   │       ConfigurationManager.ts
    │   │       env.common.ts
    │   │       env.development.ts
    │   │       index.ts
    │   │
    │	├───cert                                    // SSL certificates
    │	│      localhost.crt
    │	│      localhost.key
    │	│       
    │   └───swagger                                 // Swagger
    │
    └───server                                      // server
           server.ts
```


## Usage
* `npm run build` compile the typescripts in src folder
* `npm start` Starts the server on development mode in Typescript
* `npm run dev` Starts the server on development mode in Javascript
* `npm run grunt` Starts server using grunt file
* `docker-compose up -d` Starts the server for production 
* `npm run eslint`  Check the lint errors
* `npm run eslint-fix` Fix the lint errors which can be fixed by eslint 

## Running the server in Docker Container

Prerequisite For Docker Configuration: Docker and docker compose must be installed on the system.

Steps to run the app in a docker container :
  1. CD to project dir
  2. Create build using cmd: $ docker-compose build
  3. Start the server in daemon thread using cmd: $ docker-compose up -d 
  4. Stop the server using cmd: $ docker-compose down

## Documentation
The API documentation is written in Swagger (https://github.com/swagger-api/swagger-node#readme).

To view swagger API documentation

Visit [https://localhost:3000/swagger](https://localhost:3000/swagger) to view Swagger UI.

## Contributors
[Sparsh  Pipley](https://www.linkedin.com/in/sparsh-pipley-6ab0b1a4/)
[Ravi Vairagi](https://www.linkedin.com/in/ravi-vairagi-897028145/)
[Harshit Dubey](https://www.linkedin.com/in/harshit-dubey-new/)
## License
MIT.
