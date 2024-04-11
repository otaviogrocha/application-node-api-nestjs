import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotasEntity } from '../nota/interfaces/notas.entity';
import { GradeEntity } from '../grade/interfaces/grade.entity';
import { AlunoEntity } from '../aluno/interfaces/aluno.entity';

@Injectable()
export class HistoricoService {
  constructor(
    @InjectRepository(NotasEntity)
    private readonly notasRepository: Repository<NotasEntity>,
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
  ) {}

  // async getHistory() {
  //   const notas = await this.notasRepository.find();
  //
  //   const alunoIds = notas.map((nota) => nota.aluno_id);
  //   const materiaIds = notas.map((nota) => nota.materia_id);
  //
  //   const alunos = await this.alunoRepository.findByIds(alunoIds);
  //   const grades = await this.gradeRepository.findByIds(alunoIds);
  //   const materias = await this.materiaRepository.findByIds(materiaIds);
  //
  //   const historico = notas.map((nota) => ({
  //     aluno_id: nota.aluno_id,
  //     nome_aluno: alunos.find((aluno) => aluno.id === nota.aluno_id)?.name,
  //     grade_aluno: grades.find((grade) => grade.aluno_id === nota.aluno_id),
  //     materia_id: nota.materia_id,
  //     nome_materia: materias.find((materia) => materia.id === nota.materia_id)
  //       ?.name,
  //     nota: nota.nota,
  //   }));
  //
  //   return historico;
  // }


  //  (id do aluno, nome do aluno, grade do aluno[NomeMatéria1, NomeMatéria2...], e notas respectivas as materias do aluno)

  // ============ Substituir estruturas por DTO =============
  async getHistory() {
    const notas = await this.notasRepository.find({
      relations: ['aluno', 'materia'],
    });

    const historico = {};

    for (const nota of notas) {
      const id_aluno = nota.aluno.id;
      const nome_aluno = nota.aluno.name;
      const materia = nota.materia.name;
      const nota_value = nota.nota.toString();

      const grade = await this.gradeRepository.findOne({
        where: { aluno_id: id_aluno },
        relations: ['materias'],
      });

      const materias = grade.materias.map((materia) => materia.name);
      if (!historico[id_aluno]) {
        historico[id_aluno] = {
          id_aluno,
          nome_aluno,
          grade: materias,
        };
      }

      if (!historico[id_aluno][materia]) {
        historico[id_aluno][materia] = {
          notas: [],
        };
      }

      historico[id_aluno][materia].notas.push(nota_value);
    }

    return historico;
  }

  // async getHistoryByID(alunoId: number) {
  //   const notas = await this.notasRepository
  //     .createQueryBuilder('nota')
  //     .leftJoinAndSelect('nota.aluno', 'aluno')
  //     .leftJoinAndSelect('nota.materia', 'materia')
  //     .where('aluno.id = :alunoId', { alunoId })
  //     .select(['nota', 'aluno', 'materia'])
  //     .getMany();
  //
  //   const historico = {
  //     id_aluno: notas[0]?.aluno.id,
  //     nome_aluno: notas[0]?.aluno.name,
  //     grade: [],
  //     materias: {},
  //   };
  //
  //   for (const nota of notas) {
  //     const materia = nota.materia.name;
  //     const nota_value = nota.nota.toString();
  //
  //     if (!historico.grade.includes(materia)) {
  //       historico.grade.push(materia);
  //     }
  //
  //     if (!historico.materias[materia]) {
  //       historico.materias[materia] = {
  //         notas: [],
  //       };
  //     }
  //
  //     historico.materias[materia].notas.push(nota_value);
  //   }
  //
  //   return historico;
  // }

  async getHistoricoByAluno(alunoId: number) {
    const historico = {
      id_aluno: alunoId,
      nome_aluno: '',
      grade: [],
      materias: {},
    };

    const aluno = await this.alunoRepository.findOne({
      where: { id: alunoId },
    });

    if (!aluno) {
      throw new BadRequestException(`Aluno com ID ${alunoId} não encontrado`);
    }

    historico.nome_aluno = aluno.name;

    const notas = await this.notasRepository.find({
      where: { aluno_id: alunoId },
      relations: ['materia'],
    });

    notas.forEach((nota) => {
      const materiaNome = nota.materia.name;
      const nota_value = nota.nota.toString();

      if (!historico.grade.includes(materiaNome)) {
        historico.grade.push(materiaNome);
      }

      if (!historico.materias[materiaNome]) {
        historico.materias[materiaNome] = {
          notas: [],
        };
      }

      historico.materias[materiaNome].notas.push(nota_value);
    });

    return historico;
  }
}
