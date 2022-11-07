import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Connect the client
    await prisma.$connect()

    const user = await prisma.user.create({
        data: {
          name: 'Alice',
          email: 'alice@prisma.io',
        },
    })
    console.log(user)

    const users = await prisma.user.findMany()
    console.log(users)

    const user1 = await prisma.user.create({
        data: {
          name: 'Bob',
          email: 'bob@prisma.io',
          posts: {
            create: {
              title: 'Hello World',
            },
          },
        },
    })
    console.log(user1)

    const usersWithPosts = await prisma.user.findMany({
        include: {
          posts: true,
        },
      })
    console.dir(usersWithPosts, { depth: null })
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
