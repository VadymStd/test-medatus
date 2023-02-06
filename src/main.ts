import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.use(
      session({
        secret: process.env.JWT_LOGIN_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3000);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
