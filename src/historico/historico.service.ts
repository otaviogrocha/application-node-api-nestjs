import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotasEntity } from '../notas/interfaces/notas.entity';

@Injectable()
export class HistoricoService {
  constructor(
    @InjectRepository(NotasEntity)
    private readonly notasRepository: Repository<NotasEntity>,
  ) {}

  async getHistory() {
    return this.notasRepository.find();
  }
}
