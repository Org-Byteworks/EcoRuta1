import { Module } from '@nestjs/common';

import { BarriosController } from './barrios.controller';
import { BarriosService } from './barrios.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    BarriosController,
  ],

  providers: [
    BarriosService,
  ],
})
export class BarriosModule {}