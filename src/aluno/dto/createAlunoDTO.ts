import {IsDefined, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateAlunoDTO {
  id: number;

  @IsString()
  @IsDefined({message: 'missing field: name'})
  @IsNotEmpty()
  name: string;
}
