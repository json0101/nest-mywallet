
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogueModule } from './catalogue/catalogue.module';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
      DATABASE_HOST: Joi.required(),
      DATABASE_PORT: Joi.number().default(5432),
      JWT_SECRET: Joi.required()
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false
      }
     // synchronize: true,

      // type: "postgres",
      // url: process.env.DATABASE_URL,
      // synchronize: false,
      // logging: true,
      // entities: ["src/entity/*.*"],
      // ssl: process.env.IS_PRODUCTION==='true'? true: false,
      // autoLoadEntities: true,
      
    }),
    CatalogueModule,
    UserModule,
    AuthModule,
    CommonModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
