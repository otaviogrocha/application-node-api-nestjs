import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AlunoEntity } from '../../aluno/interfaces/aluno.entity';
import { GradeEntity } from '../../grade/interfaces/grade.entity';
import { NotasEntity } from '../../nota/interfaces/notas.entity';

// @Entity({ name: 'historico' })
// export class HistoricoEntity {
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @ManyToOne(() => AlunoEntity, (aluno) => aluno.historico)
//   @JoinColumn({ name: 'aluno_id' })
//   aluno: AlunoEntity;
//
//   @ManyToOne(() => GradeEntity, (grade) => grade.historico)
//   @JoinColumn({ name: 'grade_id' })
//   grade: GradeEntity;
//
//   @OneToMany(() => NotasEntity, (nota) => nota.historico)
//   notas: NotasEntity[];
// }
