import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import { cleanupOpenApiDoc } from 'nestjs-zod'
import { AppModule } from './app.module'
import { EnvironmentConfig } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const openApiDoc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Example API')
      .setDescription('Example API description')
      .setVersion('1.0')
      .addBearerAuth() // TODO: remove in prod
      .build(),
  )

  SwaggerModule.setup('api', app, cleanupOpenApiDoc(openApiDoc))
  app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService<EnvironmentConfig, true>)
  await app.listen(configService.get('APP_API_PORT'))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
