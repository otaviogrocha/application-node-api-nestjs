import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
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

  @OneToOne(() => AlunoEntity)
  @JoinColumn({ name: 'aluno_id', referencedColumnName: 'id' })
  aluno: AlunoEntity;

  @Column()
  materia_id: number;

  @ManyToMany(() => MateriaEntity)
  @JoinColumn({ name: 'materia_id', referencedColumnName: 'id' })
  materia: MateriaEntity;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  nota: number;
}
