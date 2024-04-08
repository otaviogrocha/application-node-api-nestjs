import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'aluno' })
export class AlunoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'name', nullable: false })
  name: string;
}
