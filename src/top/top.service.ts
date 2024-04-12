import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotasEntity } from '../nota/interfaces/notas.entity';
import { Repository } from 'typeorm';
import { AlunoEntity } from '../aluno/interfaces/aluno.entity';

@Injectable()
export class TopService {
  constructor(
    @InjectRepository(NotasEntity)
    private readonly notasRepository: Repository<NotasEntity>,
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
  ) {}
  async getTopAlunos() {
    const queryBuilder = this.alunoRepository.createQueryBuilder('aluno');
    const queryResult = await queryBuilder
      .innerJoin('aluno.notas', 'nota') // Inner Join para exibir apenas alunos com notas cadastradas.
      .select('aluno.id', 'id')
      .addSelect('aluno.name', 'name')
      .addSelect('AVG(nota.nota)', 'media')
      .groupBy('aluno.id')
      .orderBy('media', 'DESC')
      .getRawMany();


    const topAlunos = [];

    queryResult.map((result) => {
      topAlunos.push({
        id: result.id,
        name: result.name,
        media: parseFloat(result.media).toFixed(2),
      });
    });

    return topAlunos;
  }
  // async getTopAlunos(): Promise<AlunoEntity[]> {
  //   const alunos = await this.alunoRepository
  //     .createQueryBuilder('aluno')
  //     .leftJoinAndSelect('aluno.notas', 'nota')
  //     .select(['aluno.id', 'aluno.name', 'AVG(nota.nota) as media'])
  //     .groupBy('aluno.id')
  //     .orderBy('media', 'DESC')
  //     .getMany();
  //
  //   // const alunos: AlunoEntity[] = queryResult.map((row) => {
  //   //   const aluno = new AlunoEntity();
  //   //   aluno.id = row.id;
  //   //   aluno.name = row.name;
  //   //   return aluno;
  //   // });
  //   return alunos;
  // }
}
