import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @Column()
  // types: string[]; // TODO - switch to TypeEntity

  @Column()
  size: number; // min
}
