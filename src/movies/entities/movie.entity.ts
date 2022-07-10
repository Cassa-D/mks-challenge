import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from '../../types/entities/type.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  released: number; // year

  @Column()
  author: string;

  @ManyToMany(() => Type, (type) => type.movies, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  types: Type[];

  @Column()
  size: number; // min
}
