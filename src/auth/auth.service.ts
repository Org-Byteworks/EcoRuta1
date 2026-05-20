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
    // 🔑 1. Crear automáticamente al administrador si ingresa las credenciales maestras y no existe
    if (correo === 'admin@ecoruta.com') {
      const adminExiste = await this.prisma.usuario.findUnique({ where: { correo } });
      
      if (!adminExiste) {
        const hashContrasena = await bcrypt.hash('admin2026', 10);
        await this.prisma.usuario.create({
          data: {
            nombre: 'Administrador EcoRuta',
            correo: 'admin@ecoruta.com',
            password: hashContrasena,
            rol: 'ADMIN', // Asigna el rol administrativo para habilitar el menú visual
          },
        });
        console.log('🌱 Administrador maestro inicializado en la base de datos.');
      }
    }

    // 🔍 2. Proceso de autenticación normal en la base de datos
    const user = await this.prisma.usuario.findUnique({ where: { correo } });

    if (!user) throw new UnauthorizedException('No existe usuario');

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new UnauthorizedException('Password incorrecta');

    // 🎫 3. Retornar el token JWT incluyendo los datos de rol y ID
    return {
      token: this.jwt.sign({ id: user.id, rol: user.rol }),
    };
  }
}
