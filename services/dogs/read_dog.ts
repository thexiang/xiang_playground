import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  const allDogs = await prisma.dog.findUnique({
    where: {
      id: 1,
    },
  })
  // use `console.dir` to print nested objects
  console.dir(allDogs, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
