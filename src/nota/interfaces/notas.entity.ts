import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlunoEntity } from '../../aluno/interfaces/aluno.entity';
import { MateriaEntity } from '../../materia/interfaces/materia.entity';

@Entity({ name: 'nota' })
export class NotasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aluno_id: number;

  @ManyToOne(() => AlunoEntity)
  @JoinColumn({ name: 'aluno_id', referencedColumnName: 'id' })
  aluno: AlunoEntity;

  @Column()
  materia_id: number;

  @ManyToOne(() => MateriaEntity)
  @JoinColumn({ name: 'materia_id', referencedColumnName: 'id' })
  materia: MateriaEntity;

  @ManyToOne(() => AlunoEntity, (aluno) => aluno.notas)
  aluno_nota: AlunoEntity;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  nota: number;
}
