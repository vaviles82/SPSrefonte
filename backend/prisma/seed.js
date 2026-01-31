import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@sps.ch' },
    update: {},
    create: {
      email: 'admin@sps.ch',
      name: 'Valentin Admin',
      password: 'password123', 
      role: 'admin'
    },
  })
  console.log('Admin créé avec succès :', admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })