# Backend My Wallet

## Installation

```bash
$ npm install
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

## Structure Modules

1. AppModule
2. CommonModule
3. UserModule
4. AuthModule
5. CatalogueModule
6. TransactionModule

## Deployment - Swagger
https://nest-mywallet.herokuapp.com/api/

## Configuration Postgrest connection
Add this variables to your env to connect with postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=root
DATABASE_NAME=mywallet
DATABASE_PORT=5432
DATABASE_HOST=localhost
API_KEY=123
JWT_SECRET=mywallet123
EXPIRESIN=86400s
IS_PRODUCTION=false
DATABASE_URL=test
