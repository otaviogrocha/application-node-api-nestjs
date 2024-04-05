import { Module } from '@nestjs/common';
import { TopService } from './top.service';
import { TopController } from './top.controller';

@Module({
  providers: [TopService],
  controllers: [TopController]
})
export class TopModule {}
