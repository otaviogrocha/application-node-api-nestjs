import { GradeEntity } from '../../grade/interfaces/grade.entity';
import { NotasEntity } from '../../nota/interfaces/notas.entity';

export class HistoricoDTO {
  aluno_id: number;
  nome_aluno: string;
  grade: GradeEntity[];
  notas: NotasEntity[];
}
