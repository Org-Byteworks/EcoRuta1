import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';

@Injectable()
export class BarriosService {
  constructor(private readonly prisma: PrismaService) {}

  // ➕ Crear un nuevo barrio con su ruta anidada obligatoria
  create(data: any) {
    return this.prisma.barrio.create({
      data: {
        nombre: data.barrio || data.nombre || "Sector General",
        ruta: {
          create: {
            origen: data.barrio || data.nombre || "Inicio",
            destino: "Punto de Destino General",
            // 💡 Removido 'estado' de la ruta si no existe en el esquema
          }
        }
      },
      include: {
        ruta: true
      }
    });
  }

  // 🔓 Obtener todos los barrios de la base de datos
  findAll() {
    return this.prisma.barrio.findMany({
      include: {
        ruta: true, 
      },
    });
  }

  // 🔍 Obtener un solo barrio por ID
  findOne(id: number) {
    return this.prisma.barrio.findUnique({
      where: { id },
      include: {
        ruta: true,
      },
    });
  }

  // 🛠️ CORREGIDO: Removida la propiedad 'estado' que causaba el error ts(2353) de TypeScript
  update(id: number, data: any) {
    return this.prisma.barrio.update({
      where: { id },
      data: {
        nombre: data.barrio || data.nombre,
        ruta: {
          update: {
            origen: data.barrio || data.nombre,
            destino: "Punto de Destino General"
          }
        }
      },
      include: {
        ruta: true
      }
    });
  }

  // 🗑️ Eliminar un barrio del sistema
  remove(id: number) {
    return this.prisma.barrio.delete({
      where: { id },
    });
  }
}
