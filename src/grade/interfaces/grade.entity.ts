import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlunoEntity } from '../../aluno/interfaces/aluno.entity';
import { MateriaEntity } from '../../materia/interfaces/materia.entity';

@Entity({ name: 'gradeescolar' })
export class GradeEntity {
  @PrimaryGeneratedColumn() readonly id: number;
  @Column({ name: 'aluno_id', nullable: false }) readonly aluno_id:
    | number
    | null;

  @OneToOne(() => AlunoEntity)
  @JoinColumn({ name: 'aluno_id', referencedColumnName: 'id' })
  aluno: AlunoEntity;

  @ManyToMany(() => MateriaEntity)
  @JoinTable()
  materias: MateriaEntity[];
}
