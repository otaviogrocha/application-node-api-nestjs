import {IsDefined, IsNumber, isNumber} from "class-validator";

export class CreateNotaDTO {
  readonly id: number;
  @IsNumber()
  @IsDefined({message: 'missing fields: aluno_id'})
  readonly aluno_id: number;
  @IsNumber()
  @IsDefined({message: 'missing fields: materia_id'})
  readonly materia_id: number;
  @IsNumber()
  @IsDefined({message: 'missing fields: nota'})
  readonly nota: number;
}
