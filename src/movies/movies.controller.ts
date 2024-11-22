import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateMovieDto } from './dtos/create-movie.dto';

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
  getMovies() {
    return this.moviesService.getMovies();
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }
}
