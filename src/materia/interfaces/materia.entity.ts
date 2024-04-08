import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'materia' })
export class MateriaEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'name', nullable: false })
  name: string;
}
