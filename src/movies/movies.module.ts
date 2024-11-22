import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    TypeOrmModule.forFeature([Movie]),
    // ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class MoviesModule {}
