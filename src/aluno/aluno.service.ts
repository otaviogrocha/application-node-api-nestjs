import { Injectable } from '@nestjs/common';
import { CreateAlunoDTO } from './dto/createAlunoDTO';
import { AlunoEntity } from './interfaces/aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
  ) {}
  async createAluno(createAluno: CreateAlunoDTO): Promise<AlunoEntity> {
    return this.alunoRepository.save(createAluno);
  }

  async getAllAlunos(): Promise<AlunoEntity[]> {
    return this.alunoRepository.find();
  }
}
