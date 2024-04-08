import { IsArray, IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateGradeDTO {
  readonly id: number;
  readonly aluno_id: number;

  @IsArray()
  @Length(5, 5, { message: 'Deve conter exatamente 5 IDs de matérias' })
  @IsInt({ each: true })
  @IsNotEmpty({ each: true })
  readonly materiaIds: number[];
}
