## Description

Test project for Extrawest.
## Technology stack: Nest.JS, PostgreSQL(TypeORM), swagger, jest

## Prepearing
1. Create you own .env file from example.
2. You must have your PostgreSQL DB with new empty DB which name matches the one in your DB_DATABASE variable in .env file.
3. Run migrations with command "npm run typeorm:run-migrations".
4. Start the app with "npm run start".

## Installation

```bash
$ npm install
```

## Running the db migrations

```bash
# run pending migrations
$ npm run typeorm:run-migrations

# generate new migration if some of entities has been changed
$ npm run typeorm:generate-migration

# create new empty migration
$ npm run typeorm:create-migration

# revert last migration
$ npm run typeorm:revert-migration
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

Starthe project, swagger endpoint locally will be http://localhost:3000/api
