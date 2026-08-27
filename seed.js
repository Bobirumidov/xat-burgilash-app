const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@xat.uz' },
    update: {},
    create: {
      email: 'admin@xat.uz',
      name: 'Admin',
      password: 'password123', // In a real app, hash this!
      role: 'ADMIN',
    },
  })
  console.log({ admin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

