import { Controller, Get } from '@nestjs/common';
import { HistoricoService } from '../historico/historico.service';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  @Get()
  async getHistory() {
    return this.historicoService.getHistory();
  }
}
