import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/entities/movie.entity';
import { Type } from './types/entities/type.entity';
import { TypesModule } from './types/types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-mysql',
      port: 3306,
      username: 'root',
      password: '14621462',
      database: 'test',
      synchronize: true,
      logging: true,
      retryAttempts: 2,
      entities: [Movie, Type],
    }),
    MoviesModule,
    TypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
