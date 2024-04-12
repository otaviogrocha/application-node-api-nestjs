import {Injectable, NotFoundException} from '@nestjs/common';
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
    const allStudents = await this.alunoRepository.find();
    if(!allStudents.length) throw new NotFoundException('Não existem alunos cadastrados.')

    return allStudents;
  }
  async getAlunoById(alunoId: number): Promise<AlunoEntity> {
    if (isNaN(alunoId)) {
      throw new NotFoundException('O ID do aluno deve ser um número');
    }
    const aluno =  await this.alunoRepository.findOne({
      where: { id: alunoId },
    });

    if (!aluno){
      throw new NotFoundException(`O aluno ${alunoId} não foi encontrado`)
    }

    return aluno;
  }
}
