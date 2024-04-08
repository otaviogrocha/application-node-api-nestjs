import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotasEntity } from './interfaces/notas.entity';
import { Repository } from 'typeorm';
import { CreateNotasDTO } from './dto/CreateNotasDTO';

@Injectable()
export class NotasService {
  constructor(
    @InjectRepository(NotasEntity)
    private readonly notasRepository: Repository<NotasEntity>,
  ) {}

  async createNota(createNotaDto: CreateNotasDTO): Promise<NotasEntity> {
    const nota = this.notasRepository.create(createNotaDto);
    return this.notasRepository.save(nota);
  }
  async getNotas() {
    return this.notasRepository.find();
  }
}
