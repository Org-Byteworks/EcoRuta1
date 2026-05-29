import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  // Encriptar contraseña
  const hashedPassword =
    await bcrypt.hash('123456', 10);

  // Crear administrador
  await prisma.usuario.create({
    data: {
      nombre: 'Admin',
      correo: 'admin@gmail.com',
      password: hashedPassword,
      rol: 'ADMIN',
    },
  });

  console.log('Administrador creado correctamente');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });