import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dtos/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieReposity: Repository<Movie>,
  ) {}

  public async getMovies() {
    return await this.movieReposity.find();
  }

  public async createMovie(createMovieDto: CreateMovieDto) {
    let movie = await this.movieReposity.create(createMovieDto);
    try {
      movie = await this.movieReposity.save(movie);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }
    return movie;
  }
}
