import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './interfaces/grade.entity';
import { AlunoEntity } from '../aluno/interfaces/aluno.entity';
import { MateriaEntity } from '../materia/interfaces/materia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GradeEntity, AlunoEntity, MateriaEntity]),
  ],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
