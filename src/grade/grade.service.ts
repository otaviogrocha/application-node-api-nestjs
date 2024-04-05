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

  async createGrade(createGrade: CreateGradeDTO): Promise<GradeEntity> {
    return this.gradeRepository.save(createGrade);
  }

  async createGrade(idAluno: number, createGrade: CreateGradeDTO): Promise<GradeEntity> {
    // Verificar se o aluno existe
    const aluno = await this.alunoRepository.findOne(idAluno);
    if (!aluno) {
      throw new BadRequestException('Aluno não encontrado.');
    }

    // Verificar se existem pelo menos 5 matérias
    if (createGrade.length < 5) {
      throw new BadRequestException('Uma grade deve ter no mínimo 5 matérias.');
    }

    // Verificar se todas as matérias existem
    const materias = await this.materiaRepository.findByIds(createGrade);
    if (materias.length !== createGrade.length) {
      throw new BadRequestException('Uma ou mais matérias não encontradas.');
    }

    // Criar a nova grade
    const novaGrade = this.gradeRepository.create({
      aluno,
      materias,
    });

    // Salvar a nova grade no banco de dados
    return this.gradeRepository.save(novaGrade);
  }

  async getAllGrades(): Promise<GradeEntity[]> {
    try {
      return await this.gradeRepository.find();
    } catch (error) {
      console.error('Erro ao buscar as grades:', error);
      return [];
    }
  }
}
