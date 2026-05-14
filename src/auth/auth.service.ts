import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(data: any) {
    const hash = await bcrypt.hash(data.password, 10);

    return this.prisma.usuario.create({
      data: { ...data, password: hash },
    });
  }

  async login(correo: string, password: string) {
    const user = await this.prisma.usuario.findUnique({ where: { correo } });

    if (!user) throw new UnauthorizedException('No existe usuario');

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new UnauthorizedException('Password incorrecta');

    return {
      token: this.jwt.sign({ id: user.id, rol: user.rol }),
    };
  }
}