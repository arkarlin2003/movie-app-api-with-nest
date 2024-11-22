import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { AccessTokenGuardGuard } from 'src/auth/guard/access-token-guard.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({
    summary: 'All Movies',
  })
  @ApiResponse({
    status: 200,
    description: 'all movies',
  })
  // @UseGuards(APP_GUARD)
  getMovies() {
    return this.moviesService.getMovies();
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }
}
