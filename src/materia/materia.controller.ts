import {Body, Controller, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateMateriaDTO } from './dto/createMateriaDTO';
import { MateriaService } from './materia.service';
@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async createMateria(@Body() CreateMateria: CreateMateriaDTO) {
    return this.materiaService.createMateria(CreateMateria);
  }
  @Get()
  async getAllMaterias() {
    return await this.materiaService.getAllMaterias();
  }
  @Get(':id')
  async getMateriaByID(@Param('id') materiaId: number){
    return await this.materiaService.getMateriaById(materiaId)
  }
}
