const { PrismaClient, Prisma } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

// set faker locale to german
faker.locale = "de";
faker.seed(42);

const db = new PrismaClient();

const main = async () => {
  console.log("Starting to generate fake data...");

  console.log("Generating Kurse...");

  await Promise.all(
    [...Array(2).keys()].map(() => db.kurs.create({ data: getRandomCourse() }))
  );
};

const getRandomCourse = () => {
  return {
    name: faker.lorem.words(3),
  };
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    db.$disconnect();
  });
