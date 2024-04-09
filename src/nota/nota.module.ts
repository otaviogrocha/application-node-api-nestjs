import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoEntity } from '../aluno/interfaces/aluno.entity';
import { MateriaEntity } from '../materia/interfaces/materia.entity';
import { NotasEntity } from './interfaces/notas.entity';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotasEntity, AlunoEntity, MateriaEntity]),
  ],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}