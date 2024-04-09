import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotasEntity } from './interfaces/notas.entity';
import { Repository } from 'typeorm';
import { CreateNotaDTO } from './dto/CreateNotaDTO';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(NotasEntity)
    private readonly notasRepository: Repository<NotasEntity>,
  ) {}

  async verificaNotas(createNotaDto: CreateNotaDTO) {
    const { materia_id, aluno_id } = createNotaDto;

    const ultimasNotas = await this.notasRepository.find({
      where: { aluno_id, materia_id },
      order: { id: 'DESC' },
      take: 3,
    });

    console.log('Ultimas notas:', ultimasNotas);
    const notasAprovadas = ultimasNotas.filter((nota) => nota.nota >= 8);
    console.log('Notas filtradas:', notasAprovadas);

    return { ultimasNotas, notasAprovadas };
  }

  // adicionar notas:

  //   {
  //     "aluno_id": 1,
  //     "materia_id": 2,
  //     "nota": 1
  //   }
  async createNota(
    createNotaDto: CreateNotaDTO,
  ): Promise<{ status: string; nota: NotasEntity }> {
    const { ultimasNotas, notasAprovadas } =
      await this.verificaNotas(createNotaDto);

    if (ultimasNotas.length < 3 || notasAprovadas.length < 3) {
      const novaNota = this.notasRepository.create(createNotaDto);
      await this.notasRepository.save(novaNota);
      return { status: 'Nova nota criada', nota: novaNota };
    }

    if (notasAprovadas.length === 3) {
      throw new BadRequestException(
        'Três notas consecutivas acima de 80% foram registradas. Não é possível adicionar mais notas para esta matéria.',
      );
    }
    if (notasAprovadas.length === 0) {
      throw new BadRequestException(
        'As últimas 3 notas estão abaixo de 80%. A contagem foi reiniciada, novas notas deverão ser lançadas.',
      );
    }
  }
  // async getNotasbyAlunoMateria(alunoId: number, materiaId: number) {
  //   return this.notasRepository.find({
  //     where: { aluno_id: alunoId, materia_id: materiaId },
  //   });
  // }
  async getNotasbyAlunoMateria(alunoId: number, materiaId: number) {
    return this.notasRepository
      .createQueryBuilder('nota')
      .where('aluno_id = :alunoId', { alunoId })
      .andWhere('materia_id = :materiaId', { materiaId: materiaId })
      .leftJoinAndSelect('nota.materia', 'materia')
      .select(['nota.id', 'nota.aluno_id', 'nota.nota', 'materia.name'])
      .getMany();
  }

  // async getNotas() {
  //   return this.notasRepository.find({
  //     relations: ['materia'],
  //     select: ['aluno_id', 'nota'],
  //   });
  // }
  async getNotas() {
    return this.notasRepository
      .createQueryBuilder('nota')
      .leftJoinAndSelect('nota.materia', 'materia')
      .select(['nota.id', 'nota.aluno_id', 'nota.nota', 'materia.name'])
      .getMany();
  }

  // async getNotasbyAluno(alunoId: number) {
  //   return this.notasRepository.find({
  //     where: { aluno_id: alunoId },
  //   });
  // }
  async getNotasbyAluno(alunoId: number) {
    return this.notasRepository
      .createQueryBuilder('nota')
      .where('aluno_id = :alunoId', { alunoId })
      .leftJoinAndSelect('nota.materia', 'materia')
      .select(['nota.id', 'nota.aluno_id', 'nota.nota', 'materia.name'])
      .getMany();
  }
}
