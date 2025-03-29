<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Current status

**Work in progress** - pre-alpha stage!!! Last days was very effective, let's dive in:

- [x] Identity and Access Management

Enterprise-grade IAM module was created. Build up entirely using JWT identity & access management module offers guards for protecting routes, user and roles decorators, refresh tokens, invalidating tokens using REDIS, nad Role-Based Access Control. Future DLC will include:

- [ ] Policy-Based Authorization, which will replace RBAC
- [ ] API Keys for additional features
- [ ] 2FA
- [ ] Sessions with Passport, and again using REDIS

Additional work done in march:

- [x] GraphQL implementation (almost everywhere, but not final yet)

Instead of classic REST API, were was problems like under & over-fetching. GraphQL also is strongly typed, so this is an another win for application.

- [x] Swagger was removed

It's not needed with GraphQL.

- [x] Transition from NestJS version 7.x to 11.x

Smooth AF.

## Description

Rest API application for PlanWEAR (Manage appointments & organize schedules), build in [Nest](https://github.com/nestjs/nest) framework.

## Deployment

Check out [Mau](https://mau.nestjs.com), official platform for deploying NestJS applications on AWS.

## Database Structure

**Work in progress** - nothing final yet, nightly tweaks are made!!! Diagram may not represent current entities model.

![PostgreSQL Database Structure](public/db-diagram.png)

## Project Graph [Modules]

![Modules Graph](public/modules-graph.png)

## External services

PlanWEAR application will be used [Twilio](https://www.twilio.com/) external communication API as SMS provider. The following environmental variables are required:

- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN

If you don't want register Twilio account right now, you may want to remove/comment following block of code in src/app.module.ts:

```typescript
    TwilioModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        accountSid: configService.get('TWILIO_ACCOUNT_SID'),
        authToken: configService.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
```

Important: Twilio credentials, while not neccessary needed at the moment, **will be required** in near future.

## Entities

- [x] Abstract (extends other entities with id [uuid], createdAt & updatedAt fields)
- [x] Appointment
- [x] Article
- [x] BillingAddress
- [x] Comment
- [x] Company
- [x] Country
- [x] Event
- [x] Photo
- [x] ProductCategory
- [x] Product
- [x] Schedule
- [x] ServiceCategory
- [x] ServicesBooked
- [x] ServicesProvided
- [x] Service
- [x] Tag
- [x] Token
- [x] User

## Migrations

Not set-up yet, work in progress. TypeORM synchronize option is set to true - development mode ONLY, not suited for production!!!

## Installation

```bash
$ pnpm install
```

## Docker

```bash
$ docker-compose up -d
```

## Stay in touch

Author - lukasz [dot] skowron [at] gmail.com
