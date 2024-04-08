import { Module } from '@nestjs/common';
import { HistoricoController } from './historico.controller';
import { HistoricoService } from './historico.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoEntity } from '../aluno/interfaces/aluno.entity';
import { MateriaEntity } from '../materia/interfaces/materia.entity';
import { NotasEntity } from '../notas/interfaces/notas.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotasEntity, AlunoEntity, MateriaEntity]),
  ],
  controllers: [HistoricoController],
  providers: [HistoricoService],
})
export class HistoricoModule {}
