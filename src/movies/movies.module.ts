import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { TypesModule } from '../types/types.module';
import { Type } from '../types/entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Type])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
