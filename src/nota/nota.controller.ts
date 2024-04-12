import {Body, Controller, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { NotaService } from './nota.service';
import { CreateNotaDTO } from './dto/CreateNotaDTO';

@Controller('notas')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async createNota(@Body() createNotaDto: CreateNotaDTO) {
    return this.notaService.createNota(createNotaDto);
  }
  @Get('/:alunoId/:idMateria')
  async getNotasbyAlunoMateria(
    @Param('alunoId') alunoId: number,
    @Param('idMateria') idMateria: number,
  ) {
    return this.notaService.getNotasbyAlunoMateria(alunoId, idMateria);
  }

  @Get(':alunoId')
  async getNotasbyAluno(@Param('alunoId') alunoId: number) {
    return this.notaService.getNotasbyAluno(alunoId);
  }
  @Get()
  async getNotas() {
    return this.notaService.getNotas();
  }
}
