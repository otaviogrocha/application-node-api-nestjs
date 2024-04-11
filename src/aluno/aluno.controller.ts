import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAlunoDTO } from './dto/createAlunoDTO';
import { AlunoService } from './aluno.service';
import { AlunoEntity } from './interfaces/aluno.entity';
@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}
  @Post()
  async createAluno(@Body() CreateAluno: CreateAlunoDTO) {
    return this.alunoService.createAluno(CreateAluno);
  }
  @Get()
  async getAllAlunos(): Promise<AlunoEntity[]> {
    return this.alunoService.getAllAlunos();
  }
  @Get('/:id')
  async getAlunosById(@Param('id') alunoId: number): Promise<AlunoEntity> {
    return this.alunoService.getAlunosById(alunoId);
  }
}
