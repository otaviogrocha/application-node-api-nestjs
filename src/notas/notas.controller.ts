import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotasService } from './notas.service';
import { CreateNotasDTO } from './dto/CreateNotasDTO';

@Controller('historico')
export class NotasController {
  constructor(private readonly notaService: NotasService) {}
  @Post()
  async createNota(@Body() createNotaDto: CreateNotasDTO) {
    return this.notaService.createNota(createNotaDto);
  }
  @Get()
  async getNotas() {
    return this.notaService.getNotas();
  }
}
