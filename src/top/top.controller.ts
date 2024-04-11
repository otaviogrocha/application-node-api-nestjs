import { Controller, Get } from '@nestjs/common';
import { TopService } from '../top/top.service';

@Controller('top')
export class TopController {
  constructor(private readonly topService: TopService) {}

  @Get()
  async getTopAlunos() {
    return this.topService.getTopAlunos();
  }
}
