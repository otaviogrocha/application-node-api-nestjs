import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Grades' })
export class GradeEntity {
  @PrimaryGeneratedColumn('rowid')
  readonly id: number;
  // @Column({ name: 'aluno_id', nullable: false })
  // readonly idAluno: number;
  @Column({ name: 'materiaId', nullable: false })
  @ManyToMany()
  readonly materia: number[];

}
