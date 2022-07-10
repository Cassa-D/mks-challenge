import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './entities/type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private typeRepo: Repository<Type>,
  ) {}

  create(createTypeDto: CreateTypeDto) {
    return this.typeRepo.save(createTypeDto);
  }

  findAll() {
    return this.typeRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(label: string) {
    return this.typeRepo.findOne({
      where: {
        label,
      },
      relations: ['movies'],
    });
  }

  async remove(id: string) {
    return this.typeRepo.delete({ id });
  }
}
