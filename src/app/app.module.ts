import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from 'src/movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import enviromentValidation from 'src/config/enviroment.validation';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuardGuard } from 'src/auth/guard/access-token-guard.guard';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MoviesModule,
    AuthModule,
    UsersModule,
    /**
     * enviroment configuration
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
      validationSchema: enviromentValidation,
    }),
    /**
     * database configuration
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        host: configService.get('database.host'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**global guard */
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuardGuard,
    },
  ],
})
export class AppModule {}
