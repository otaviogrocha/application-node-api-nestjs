import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotasEntity } from '../nota/interfaces/notas.entity';
import { GradeEntity } from '../grade/interfaces/grade.entity';
import { AlunoEntity } from '../aluno/interfaces/aluno.entity';
// import { MateriaEntity } from '../materia/interfaces/materia.entity';

@Injectable()
export class HistoricoService {
  constructor(
    @InjectRepository(NotasEntity)
    private readonly notasRepository: Repository<NotasEntity>,
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
    // @InjectRepository(MateriaEntity)
    // private readonly materiaRepository: Repository<MateriaEntity>,
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

  // Exiba essas informações: (id do aluno, nome do aluno, grade do aluno[NomeMatéria1, NomeMatéria2...], e notas respectivas as materias do aluno)
  // async getHistory() {
  //   return this.notasRepository
  //     .createQueryBuilder('nota')
  //     .leftJoinAndSelect('nota.aluno', 'aluno')
  //     .leftJoinAndSelect('aluno.grade', 'grade')
  //     .leftJoinAndSelect('grade.materias', 'materia')
  //     .select([
  //       'aluno.id AS id_aluno',
  //       'aluno.name AS nome_aluno',
  //       'grade.id AS id_grade',
  //       'materia.id AS id_materia',
  //       'materia.name AS nome_materia',
  //       'nota.nota AS nota',
  //     ])
  //     .getRawMany();
  // }

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

      const aluno = await this.alunoRepository.findOne({
        where: { id: id_aluno },
        relations: ['grade'],
      });

      // const grade = await this.gradeRepository.findOne({
      //   where: { aluno_id: id_aluno },
      //   relations: ['materias'],
      // });

      // if (!historico[id_aluno].grade.includes(materia)) {
      //   historico[id_aluno].grade.push(materia);
      // }

      const materias = aluno.grade.materias.map((materia) => materia.name);
      if (!historico[id_aluno]) {
        historico[id_aluno] = {
          id_aluno,
          nome_aluno,
          grade: [materias],
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
}
