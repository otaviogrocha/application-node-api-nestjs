import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GradeEntity } from '../../grade/interfaces/grade.entity';

@Entity({ name: 'aluno' })
export class AlunoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'name', nullable: false })
  name: string;

  @OneToOne(() => GradeEntity)
  @JoinColumn()
  grade: GradeEntity;
}
