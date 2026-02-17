import { Module } from '@nestjs/common';
import { SacramentsService } from './sacraments.service';
import { SacramentsController } from './sacraments.controller';

@Module({
  providers: [SacramentsService],
  controllers: [SacramentsController],
})
export class SacramentsModule {}
