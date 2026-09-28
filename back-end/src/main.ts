import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule, ObserveInstrument } from './app.module.js';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              //Usuario envía cosas que no corresponda
      forbidNonWhitelisted: true,   //No permite enviar cosas que no correspondan
      transform: true,              //Transforma los datos que recibe a los tipos que se le indican
    })
  );

  app.enableCors({
    origin: 'http://192.168.0.193:3001',
  });
  
  await app.listen(process.env.PORT ?? 4000);
}
await bootstrap();
