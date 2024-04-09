import { BadRequestException, Injectable } from '@nestjs/common';
import { GradeEntity } from './interfaces/grade.entity';
import { CreateGradeDTO } from './dto/createGrade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlunoEntity } from '../aluno/interfaces/aluno.entity';
import { MateriaEntity } from '../materia/interfaces/materia.entity';
@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
    @InjectRepository(MateriaEntity)
    private readonly materiaRepository: Repository<MateriaEntity>,
  ) {}

  // async createGrader(
  //   aluno_id: number,
  //   createGrade: CreateGradeDTO,
  // ): Promise<GradeEntity> {
  //   const novaGrade = this.gradeRepository.create({
  //     ...createGrade,
  //     aluno_id: aluno_id,
  //   });
  //   return this.gradeRepository.save(novaGrade);
  // }

  async createGrade(createGrade: CreateGradeDTO): Promise<GradeEntity> {
    const { aluno_id, materiaIds } = createGrade;

    const gradeExistente = await this.gradeRepository.findOne({
      where: { aluno_id },
    });
    if (gradeExistente) {
      throw new BadRequestException(
        `O aluno com o ID ${aluno_id} já possui uma grade associada`,
      );
    }

    if (materiaIds.length !== 5) {
      throw new BadRequestException('Deve conter exatamente 5 IDs de matérias');
    }

    const materiasExistentes = await Promise.all(
      materiaIds.map(async (materiaId) => {
        const materia = await this.materiaRepository.findOne({
          where: { id: materiaId },
        });
        if (!materia) {
          throw new BadRequestException(
            `A matéria com o ID ${materiaId} não foi encontrada`,
          );
        }
        return materia;
      }),
    );

    if (materiasExistentes.length !== 5) {
      throw new BadRequestException('Alguns IDs de matérias não existem');
    }

    const materias: MateriaEntity[] = await Promise.all(
      materiaIds.map((materiaId) =>
        this.materiaRepository.findOne({ where: { id: materiaId } }),
      ),
    );

    const novaGrade = this.gradeRepository.create({
      aluno_id: aluno_id,
      materias: materias,
    });
    return this.gradeRepository.save(novaGrade);
  }

  async getAllGrades(): Promise<GradeEntity[]> {
    try {
      return await this.gradeRepository.find({
        relations: ['materias'],
      });
    } catch (error) {
      console.error('Erro ao buscar as grades:', error);
      return [];
    }
  }

  async getMateriasById(
    alunoId: number,
  ): Promise<{ gradeId: number; materias: string[] }[]> {
    const grades = await this.gradeRepository.find({
      where: { aluno_id: alunoId },
      relations: ['materias'],
    });

    return grades.map((grade) => ({
      gradeId: grade.id,
      materias: grade.materias.map((materia) => materia.name),
    }));
  }
}
