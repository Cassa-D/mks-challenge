import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  async create(@Res() response, @Body() createTypeDto: CreateTypeDto) {
    const type = await this.typesService.findOne(createTypeDto.label);

    if (type) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `${createTypeDto.label} already exists`,
      });
    }

    const newType = await this.typesService.create(createTypeDto);
    return response.status(HttpStatus.CREATED).json(newType);
  }

  @Get()
  async findAll(@Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(await this.typesService.findAll());
  }

  @Get(':label')
  async findOne(@Res() response, @Param('label') label: string) {
    const foundType = await this.typesService.findOne(label);
    if (!foundType) {
      return response.status(HttpStatus.NOT_FOUND).json();
    }
    return response.status(HttpStatus.OK).json(foundType);
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    const foundType = await this.typesService.findOneById(id);
    if (!foundType) {
      return response.status(HttpStatus.NOT_FOUND).json();
    }

    await this.typesService.remove(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
