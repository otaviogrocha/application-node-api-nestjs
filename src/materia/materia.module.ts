import { Module } from '@nestjs/common';
import { MateriaController } from './materia.controller';
import { MateriaService } from './materia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaEntity } from './interfaces/materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MateriaEntity])],
  controllers: [MateriaController],
  providers: [MateriaService],
})
export class MateriaModule {}
