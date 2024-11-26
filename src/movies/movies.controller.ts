import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { AuthType } from 'src/auth/enums/auth.enum';
import { ActiveUser } from 'src/auth/decorators/auth/active-user.decorator';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'All Movies',
  })
  @ApiResponse({
    status: 200,
    description: 'all movies',
  })
  getMovies(@ActiveUser() user) {
    console.log(user);
    return this.moviesService.getMovies();
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }
}
