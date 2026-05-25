import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // 🟢 REGISTER
  async register(dto: RegisterDto) {
    const exists = await this.prisma.usuario.findUnique({
      where: { correo: dto.correo },
    });

    if (exists) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        correo: dto.correo,
        password: hashed,
      },
    });

    const { password, ...result } = user;
    return result;
  }

  // LOGIN
async login(dto: LoginDto) {
  // Buscar usuario por correo
  const user = await this.prisma.usuario.findUnique({
    where: { correo: dto.correo },
  });

  // Validar si existe el usuario
  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  // Validar contraseña
  const valid = await bcrypt.compare(dto.password, user.password);

  if (!valid) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  // Payload del token JWT
  const payload = {
    sub: user.id,
    correo: user.correo,
    nombre: user.nombre,
    rol: user.rol,
  };

  // Retornar token
  return {
    access_token: this.jwtService.sign(payload),
  };
}
};
