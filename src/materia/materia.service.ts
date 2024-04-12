import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateMateriaDTO } from './dto/createMateriaDTO';
import { MateriaEntity } from './interfaces/materia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MateriaService {
  constructor(
    @InjectRepository(MateriaEntity)
    private readonly materiaRepository: Repository<MateriaEntity>,
  ) {}
  async createMateria(CreateMateria: CreateMateriaDTO): Promise<MateriaEntity> {
    const { name } = CreateMateria
    const materiaExistente = await this.materiaRepository.findOne({ where: { name } });
    if (materiaExistente) throw new BadRequestException(`Já existe a matéria: (${name}) cadastrada.`);

    return this.materiaRepository.save(CreateMateria);
  }

  async getAllMaterias(): Promise<MateriaEntity[]> {
    try {
      const materias = await this.materiaRepository.find();
      if (!materias.length) throw new NotFoundException('Não existem matérias cadastradas')
      return materias;
    } catch (error) {
      throw new BadRequestException('Não existem matérias cadastradas');
    }
  }

  async getMateriaById (materiaId: number) {
    if (isNaN(materiaId)) {
      throw new NotFoundException('O ID de matéria deve ser um número.');
    }
    const materia =  await this.materiaRepository.findOne({ where: { id: materiaId } });

    if (!materia){
      throw new NotFoundException(`A matéria ${materiaId} não foi encontrada.`)
    }

    return materia;
  }
}
