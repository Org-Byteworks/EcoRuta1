import { Module } from '@nestjs/common';
import { QuejasService } from './quejas.service';
import { QuejasController } from './quejas.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // 🔥 ESTO ES LO CLAVE
  controllers: [QuejasController],
  providers: [QuejasService],
})
export class QuejasModule {}