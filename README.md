# NestJS Base API Project

This is a base source code for a NestJS project. It is an API that provides methods for posting news articles, managing idol and celebrity information, and handling user management.

## 📝 Description

This project offers a full-featured API for a content management system with the following main features:

- **User Management**: User registration, login, and profile updates.
- **Role and Permission Management**: User access control based on roles and permissions.
- **News Management**: API for creating, editing, and deleting news articles.
- **Idol Information Management**: APIs for creating and updating idol and celebrity information.

## 🛠️ Technologies Used

The project is built with modern technologies:

- **NestJS**: A framework for building efficient, scalable Node.js server-side applications.
- **PostgreSQL**: A relational database used for data storage.
- **TypeORM**: An ORM for TypeScript and JavaScript supporting PostgreSQL.
- **JWT Authentication**: A mechanism for securing API endpoints using JSON Web Tokens.
- **Role-based Access Control (RBAC)**: User access control based on roles.
- **Swagger**: Auto-generated API documentation using Swagger UI.
- **Docker**: Containerization of the application for easy deployment.
- **Unit Testing**: Ensuring code quality with unit tests.

## 📚 System Requirements

- Node.js >= 18
- Docker >= 20
- PostgreSQL >= 12

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
$ npm run build
$ npm run start:prod
```

## Running the app with docker

```bash
$ docker-compose up --build
```

## API Documentation with Swagger

http://localhost:3004/doc

## Set up environment variables

Update enviroment file in the src/config/env folder

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations script

```bash
$ npm run migration:create -- src/migrations/NameFile

$ npm run migration:run
```
