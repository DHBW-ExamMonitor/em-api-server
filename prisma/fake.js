const { PrismaClient, Prisma } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

// set faker locale to german
faker.locale = "de";
faker.seed(42);

const db = new PrismaClient();

const main = async () => {
  console.log("Starting to generate fake data...");

  console.log("Generating Kurse...");
  await db.kurs.deleteMany();
  await Promise.all(
    [...Array(2).keys()].map(
      async () => await db.kurs.create({ data: getRandomCourse() })
    )
  );
  console.log("Kurse generated.");

  console.log("Generating Studenten...");
  await db.student.deleteMany();
  const kurse = await db.kurs.findMany();
  for (let i = 0; i < kurse.length; i++) {
    [...Array(35).keys()].map(
      async () =>
        await db.student.create({
          data: getRandomStudent(kurse[i].id),
        })
    );
  }
  console.log("Studenten generated.");
};

const getRandomCourse = () => {
  return {
    name: faker.lorem.words(3),
  };
};

const getRandomStudent = (kursId) => {
  return {
    matrikelnummer: faker.random.numeric(9),
    studentenStatus: faker.helpers.arrayElement([
      "IMMATRIKULIERT",
      "EXMATRIKULIERT",
    ]),
    kursId: kursId,
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
