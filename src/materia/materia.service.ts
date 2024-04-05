import { Injectable } from '@nestjs/common';
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
    return this.materiaRepository.save(CreateMateria);
  }

  async getAllMaterias(): Promise<MateriaEntity[]> {
    try {
      return await this.materiaRepository.find();
    } catch (error) {
      console.error('Erro ao buscar as grades:', error);
      return [];
    }
  }
}
