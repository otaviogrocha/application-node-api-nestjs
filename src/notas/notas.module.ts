import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoEntity } from '../aluno/interfaces/aluno.entity';
import { MateriaEntity } from '../materia/interfaces/materia.entity';
import { NotasEntity } from './interfaces/notas.entity';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotasEntity, AlunoEntity, MateriaEntity]),
  ],
  controllers: [NotasController],
  providers: [NotasService],
})
export class NotasModule {}
