import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMateriaDTO } from './dto/createMateriaDTO';
import { MateriaService } from './materia.service';
@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}
  @Post()
  async createMateria(@Body() CreateMateria: CreateMateriaDTO) {
    return this.materiaService.createMateria(CreateMateria);
  }
  @Get()
  async getAllMaterias() {
    return this.materiaService.getAllMaterias();
  }
}
