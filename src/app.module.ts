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
    // mysql://b1deb10c280d05:071935ce@us-cdbr-east-06.cleardb.net/heroku_5f5d912250d46b7?reconnect=true
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'us-cdbr-east-06.cleardb.net',
      port: 3306,
      username: 'b1deb10c280d05',
      password: '071935ce',
      database: 'heroku_5f5d912250d46b7',
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
