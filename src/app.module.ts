import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';

import { RutasModule } from './rutas/rutas.module';

import { HorariosModule } from './horarios/horarios.module';

import { BarriosModule } from './barrios/barrios.module';

import { QuejasModule } from './quejas/quejas.module';

import { RespuestasModule } from './respuestas/respuestas.module';

import { DashboardModule } from './dashboard/dashboard.module';

import { VehiculosModule } from './vehiculos/vehiculos.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    PrismaModule,

    AuthModule,

    RutasModule,

    HorariosModule,

    BarriosModule,

    QuejasModule,

    RespuestasModule,

    DashboardModule,

    VehiculosModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}