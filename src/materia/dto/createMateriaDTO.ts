import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class CreateMateriaDTO {
  id: number;

  @IsString()
  @IsDefined({message: 'missing fields: name'})
  @IsNotEmpty()
  name: string;
}
