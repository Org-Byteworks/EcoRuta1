import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';

import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';// este sirve para encritar la contraseña

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // ======================================
  // LOGIN
  // ======================================
  async login(dto: LoginDto) {

    // Buscar usuario
    const user =
      await this.prisma.usuario.findUnique({
        where: {
          correo: dto.correo,
        },
      });

    // Validar existencia
    if (!user) {
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );
    }

    // Validar contraseña
    const valid =
      await bcrypt.compare(
        dto.password,
        user.password,
      );

    if (!valid) {
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );
    }

    // Payload JWT
    const payload = {

      sub: user.id,

      correo: user.correo,

      nombre: user.nombre,

      rol: user.rol,
    };

    // Retornar token
    return {

      access_token:
        this.jwtService.sign(payload),
    };
  }

}