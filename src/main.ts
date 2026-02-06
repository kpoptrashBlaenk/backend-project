import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import { cleanupOpenApiDoc } from 'nestjs-zod'
import { AppModule } from './app.module'
import { EnvironmentConfig } from './config/env'

async function bootstrap() {
  // create app
  const app = await NestFactory.create(AppModule)

  const openApiDoc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Backend Class')
      .setDescription('API for Backend Class')
      .setVersion('0.2')
      .addBearerAuth() // add auth guard by default
      .build(),
  )

  SwaggerModule.setup('api', app, cleanupOpenApiDoc(openApiDoc))
  app.useLogger(app.get(Logger)) // add logger
  const configService = app.get(ConfigService<EnvironmentConfig, true>) // load env
  await app.listen(configService.get('APP_API_PORT')) // start
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
