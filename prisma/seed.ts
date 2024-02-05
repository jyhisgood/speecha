import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';

const prisma = new PrismaClient();

const LIST_COUNT = { MIN: 3, MAX: 8 };
const POST_COUNT = 100;

async function main() {
  const deleteAllPosts = await prisma.post.deleteMany();
  console.log('Deleted all of posts', deleteAllPosts);
  const postPromise = Array(POST_COUNT)
    .fill(null)
    .map(async () => {
      const title = `${faker.lorem.sentence({ min: 4, max: 6 })}`;
      const heading = `# ${faker.lorem.sentence({ min: 3, max: 4 })}\n`;

      const line = '\n---\n';
      const contents = `${faker.lorem.paragraphs(5)}\n`;
      const list = Array(_.random(LIST_COUNT.MIN, LIST_COUNT.MAX))
        .fill(null)
        .reduce((acc) => {
          return `${acc}- ${faker.lorem.sentence({ min: 4, max: 7 })}\n`;
        }, '');

      const numberList = Array(_.random(LIST_COUNT.MIN, LIST_COUNT.MAX))
        .fill(null)
        .reduce((acc, _, idx) => {
          return `${acc}${idx + 1} ${faker.lorem.sentence({
            min: 4,
            max: 7,
          })}\n`;
        }, '');

      const blockQuote = Array(_.random(LIST_COUNT.MIN, LIST_COUNT.MAX))
        .fill(null)
        .reduce((acc) => {
          return `${acc}> ${faker.lorem.sentence({ min: 4, max: 7 })}\n`;
        }, '');

      const codeBlock = `<code>\n${Array(
        _.random(LIST_COUNT.MIN, LIST_COUNT.MAX)
      )
        .fill(null)
        .reduce((acc) => {
          return `${acc}${faker.lorem.sentence({ min: 4, max: 7 })}\n`;
        }, '')}</code>\n`;

      const image = `![${faker.lorem.words(3)}](${faker.image.url()})\n`;
      const link = `[${
        faker.airline.airplane().name
      }](${faker.internet.url()})`;
      const effects = `- *single asterisks*\n- _single underscores_\n- **double asterisks**\n- __double underscores__\n- ~~cancelline~~\n`;

      const randomContents = [
        contents,
        list,
        numberList,
        blockQuote,
        codeBlock,
        image,
        link,
        effects,
      ];
      const dummyContents = Array(_.random(3, 5))
        .fill(null)
        .reduce((acc) => {
          const secondHeading = `## ${faker.lorem.sentence({
            min: 3,
            max: 4,
          })}\n`;
          return `${acc}${secondHeading}${randomContents[_.random(0, 7)]}\n`;
        }, '');
      const content = `\n${heading}${dummyContents}${line}`;

      return prisma.post.create({
        data: {
          title,
          content,
        },
      });
    });
  await Promise.all(postPromise);
}
console.log(`${POST_COUNT} columns created successfully`);
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
