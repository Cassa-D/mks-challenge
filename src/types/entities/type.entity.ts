import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => Movie, (movie) => movie.types, {
    onDelete: 'CASCADE',
  })
  movies: Movie[];

  @Column({ unique: true })
  label: string;
}
