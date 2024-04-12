import { Controller, Get, Param } from '@nestjs/common';
import { HistoricoService } from '../historico/historico.service';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  @Get()
  async getHistory() {
    return this.historicoService.getHistory();
  }
  @Get(':id')
  async getHistoryById(@Param('id') alunoId: number) {
    return this.historicoService.getHistoricoByAluno(alunoId);
  }
}
