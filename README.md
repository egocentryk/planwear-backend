<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Rest API application for PlanWEAR (Manage appointments & organize schedules), build in [Nest](https://github.com/nestjs/nest) framework.

## Current status

**Work in progress** - pre-alpha stage!!!

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

[x] Abstract (extends other entities with id [uuid], createdAt & updatedAt fields)
[x] Appointment
[x] Article
[x] Comment
[x] Company
[x] Photo
[x] ProductCategory
[x] Product
[x] Schedule
[x] ServiceCategory
[ ] ServicesBooked
[ ] ServicesProvided
[x] Service
[x] Tag
[x] Token
[x] User

## Installation

```bash
$ npm install
```

## Docker

```bash
$ docker-compose up -d
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

## Stay in touch

- Author - kontakt@egocentryk.pl
