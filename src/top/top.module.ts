import { Module } from '@nestjs/common';
import { TopService } from './top.service';
import { TopController } from './top.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotasEntity } from '../nota/interfaces/notas.entity';
import { AlunoEntity } from '../aluno/interfaces/aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotasEntity, AlunoEntity])],
  providers: [TopService],
  controllers: [TopController],
})
export class TopModule {}
