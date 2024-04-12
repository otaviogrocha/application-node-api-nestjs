import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {GradeEntity} from './interfaces/grade.entity';
import {CreateGradeDTO} from './dto/createGrade.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {MateriaEntity} from '../materia/interfaces/materia.entity';
import {AlunoService} from "../aluno/aluno.service";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
    private readonly alunoService: AlunoService,
    @InjectRepository(MateriaEntity)
    private readonly materiaRepository: Repository<MateriaEntity>,
  ) {}

  // async createGrade(
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

    const gradeExistente = await this.gradeRepository.findOne({ where: { aluno_id } });

    if (gradeExistente) throw new BadRequestException(`O aluno com o ID ${aluno_id} já possui uma grade associada`);
    if (materiaIds.length !== 5) throw new BadRequestException('Deve conter exatamente 5 matérias'); // Sobrepõe a verificação do @Pipeline()

    const materiasExistentes = await Promise.all(
      materiaIds.map(async (materiaId) => {
        const materia = await this.materiaRepository.findOne({ where: { id: materiaId }});
        if (!materia) throw new BadRequestException (`A matéria com o ID ${materiaId} não foi encontrada`);
        return materia;
      }),
    );

    if (materiasExistentes.length !== 5) throw new BadRequestException('Não existem 5 matérias válidas suficientes, por favor informe outras.');

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
    // try {
    //   return await this.gradeRepository.find({
    //     relations: ['materias'],
    //   });
    // } catch (error) {
    //   console.error('Erro ao buscar as grades:', error);
    //   return [];
    // }
    const grades = await this.gradeRepository.find({ relations: ['materias'] });
    if (!grades.length) throw new NotFoundException('Grades não cadastradas')
    return grades;
  }

  async getGradesById (alunoId: number ): Promise<GradeEntity[]> {

    await this.alunoService.getAlunoById(alunoId)
    return await this.gradeRepository.find({where: {aluno_id: alunoId}, relations: ['materias']});

    // return grades.map((grade) => ({
    //   gradeId: grade.id,
    //   materias: grade.materias.map((materia) => materia.name),
    // }));
  }
}
