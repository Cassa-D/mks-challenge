import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Type } from '../types/entities/type.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    @InjectRepository(Type)
    private typeRepo: Repository<Type>,
  ) {}

  createTypesIfNotExists = async (labels: string[]) => {
    const types: Type[] = [];
    for (const label of labels) {
      let type = await this.typeRepo.findOneBy({ label });
      console.log('Found type: ', { type });
      if (!type) {
        type = await this.typeRepo.save({ label });
        console.log('Created type: ', { type });
      }
      types.push(type);
    }
    return types;
  };

  async create(movie: CreateMovieDto) {
    const movieToSave = {
      ...movie,
      types: await this.createTypesIfNotExists(movie.types),
    };
    return this.movieRepo.save(movieToSave);
  }

  findAll() {
    return this.movieRepo.find({
      relations: ['types'],
    });
  }

  findOne(id: string) {
    return this.movieRepo.findOne({
      where: { id },
      relations: ['types'],
    });
  }

  async update(id: string, movie: UpdateMovieDto) {
    let movieToSave;
    if (movie.types && movie.types.length > 0) {
      movieToSave = {
        ...movie,
        types: await this.createTypesIfNotExists(movie.types),
      };
    } else {
      movieToSave = movie;
    }
    const movieToUpdate = await this.findOne(id);
    movieToUpdate.types = movieToSave.types ?? movieToUpdate.types;
    movieToUpdate.author = movieToSave.author ?? movieToUpdate.author;
    movieToUpdate.size = movieToSave.size ?? movieToUpdate.size;
    movieToUpdate.name = movieToSave.name ?? movieToUpdate.name;
    movieToUpdate.released = movieToSave.released ?? movieToUpdate.released;
    return this.movieRepo.save(movieToUpdate);
  }

  remove(id: string) {
    return this.movieRepo.delete({ id });
  }
}
