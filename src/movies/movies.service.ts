import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  create(movie: CreateMovieDto) {
    return this.movieRepo.save(movie);
  }

  findAll() {
    return this.movieRepo.find();
  }

  findOne(id: string) {
    return this.movieRepo.findOneBy({ id });
  }

  update(id: string, movie: UpdateMovieDto) {
    return this.movieRepo.update(id, movie);
  }

  remove(id: string) {
    return this.movieRepo.delete({ id });
  }
}
