import { Module } from '@nestjs/common';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { AlunoEntity } from './interfaces/aluno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AlunoEntity])],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
