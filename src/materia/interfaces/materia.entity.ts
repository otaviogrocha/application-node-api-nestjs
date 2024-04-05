import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'Materias' })
export class MateriaEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;
  @Column({ name: 'nome', nullable: false })
  name: string;
  @Column({ name: 'gradeId', nullable: true })
  gradeId: number;
}
