import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotasEntity } from './interfaces/notas.entity';
import { Repository } from 'typeorm';
import { CreateNotaDTO } from './dto/CreateNotaDTO';
import {AlunoService} from "../aluno/aluno.service";
import {MateriaService} from "../materia/materia.service";

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(NotasEntity)
    private readonly notasRepository: Repository<NotasEntity>,
    private readonly alunoService: AlunoService,
    private readonly materiaService: MateriaService,
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
  async createNota(createNotaDto: CreateNotaDTO): Promise<{ status: string; nota: NotasEntity }> {
    const { ultimasNotas, notasAprovadas } = await this.verificaNotas(createNotaDto);

    if (ultimasNotas.length < 3 || notasAprovadas.length < 3) {
      const novaNota = await this.notasRepository.create(createNotaDto);
      await this.notasRepository.save(novaNota);
      return { status: 'Nova nota criada', nota: novaNota };
    }

    if (notasAprovadas.length === 3) {
      throw new BadRequestException('Três notas consecutivas acima de 80% foram registradas. Não é possível adicionar mais notas para esta matéria.');
    }
    if (notasAprovadas.length === 0) {
      throw new BadRequestException('As últimas 3 notas estão abaixo de 80%. A contagem foi reiniciada, novas notas deverão ser lançadas.');
    }
  }
  // async getNotasbyAlunoMateria(alunoId: number, materiaId: number) {
  //   return this.notasRepository.find({
  //     where: { aluno_id: alunoId, materia_id: materiaId },
  //   });
  // }
  async getNotasbyAlunoMateria(alunoId: number, materiaId: number) {
    await this.alunoService.getAlunoById(alunoId);
    await this.materiaService.getMateriaById(materiaId);

    const notas = await this.notasRepository
      .createQueryBuilder('nota')
      .where('aluno_id = :alunoId', { alunoId })
      .andWhere('materia_id = :materiaId', { materiaId: materiaId })
      .leftJoinAndSelect('nota.materia', 'materia')
      .leftJoinAndSelect('nota.aluno', 'aluno')
      .select(['nota.id', 'nota.aluno_id', 'aluno.name', 'nota.nota', 'materia.name'])
      .getMany();

    if(!notas.length) throw new NotFoundException('Não existem notas cadastradas para este aluno nesta matéria.')
    return notas.map(nota => ({
      id: nota.id,
      aluno_id: nota.aluno_id,
      name: nota.aluno.name,
      nota: nota.nota,
      materia: nota.materia.name
    }));
  }

  // async getNotas() {
  //   return this.notasRepository.find({
  //     relations: ['materia'],
  //     select: ['aluno_id', 'nota'],
  //   });
  // }
  async getNotas() {
    const notas =  await this.notasRepository
      .createQueryBuilder('nota')
      .leftJoinAndSelect('nota.materia', 'materia')
        .leftJoinAndSelect('nota.aluno', 'aluno')
        .select(['nota.id', 'nota.aluno_id', 'aluno.name', 'nota.nota', 'materia.name'])
      .getMany();

    if(!notas.length) throw new NotFoundException('Não existem notas cadastradas.')
    return notas.map(nota => ({
      id: nota.id,
      aluno_id: nota.aluno_id,
      name: nota.aluno.name,
      nota: nota.nota,
      materia: nota.materia.name
    }));
  }

  // async getNotasbyAluno(alunoId: number) {
  //   return this.notasRepository.find({
  //     where: { aluno_id: alunoId },
  //   });
  // }
  async getNotasbyAluno(alunoId: number) {
    await this.alunoService.getAlunoById(alunoId);
    const notas = await this.notasRepository
      .createQueryBuilder('nota')
      .leftJoinAndSelect('nota.materia', 'materia')
      .leftJoinAndSelect('nota.aluno', 'aluno')
      .where('aluno_id = :alunoId', { alunoId })
      .select(['nota.id', 'nota.aluno_id', 'aluno.name', 'nota.nota', 'materia.name'])
      .getMany();

    if(!notas.length) throw new NotFoundException('Não existem notas cadastradas para este aluno.')

    return notas.map(nota => ({
      id: nota.id,
      aluno_id: nota.aluno_id,
      name: nota.aluno.name,
      nota: nota.nota,
      materia: nota.materia.name
    }));

  }
}
