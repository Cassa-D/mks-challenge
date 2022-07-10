import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Res() response, @Body() movie: CreateMovieDto) {
    const newMovie = await this.moviesService.create(movie);
    return response.status(HttpStatus.CREATED).json(newMovie);
  }

  @Get()
  async findAll(@Res() response) {
    const movies = await this.moviesService.findAll();
    return response.status(HttpStatus.OK).json(movies);
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    const movie = await this.moviesService.findOne(id);

    if (movie == null) {
      console.log(movie);
      return response.status(HttpStatus.NOT_FOUND).json();
    }

    return response.status(HttpStatus.OK).json(movie);
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() movie: UpdateMovieDto,
  ) {
    const fMovie = await this.moviesService.findOne(id);
    if (fMovie == null) {
      return response.status(HttpStatus.NOT_FOUND).json();
    }

    await this.moviesService.update(id, movie);
    const uMovie = await this.moviesService.findOne(id);
    return response.status(HttpStatus.OK).json(uMovie);
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    const fMovie = await this.moviesService.findOne(id);
    if (fMovie == null) {
      return response.status(HttpStatus.NOT_FOUND).json();
    }

    await this.moviesService.remove(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
