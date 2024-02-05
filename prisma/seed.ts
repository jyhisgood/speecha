import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const postPromise = Array(300)
    .fill(null)
    .map(async () => {
      const title = faker.lorem.sentence({ min: 4, max: 6 });
      const content = faker.lorem.sentences(30, '\n');
      return prisma.post.create({
        data: {
          title,
          content,
        },
      });
    });
  await Promise.all(postPromise);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
