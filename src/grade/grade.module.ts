import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './interfaces/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity])],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
