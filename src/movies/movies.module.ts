import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { TypesModule } from './types/types.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), TypesModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
