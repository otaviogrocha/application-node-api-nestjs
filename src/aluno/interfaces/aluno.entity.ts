import {
  Column,
  Entity,
  JoinColumn, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GradeEntity } from '../../grade/interfaces/grade.entity';
import { NotasEntity } from '../../nota/interfaces/notas.entity';

@Entity({ name: 'aluno' })
export class AlunoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'name', nullable: false })
  name: string;

  // associar idGrade- TODO
  @OneToOne(() => GradeEntity)
  @JoinColumn()
  grade: GradeEntity;

  @OneToMany(() => NotasEntity, (nota) => nota.aluno)
  notas: NotasEntity[];
}
