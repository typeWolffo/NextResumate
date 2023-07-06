import { prisma } from "@/server/db";
import { type CandidateType } from "@/types/Candidate";
import { faker } from "@faker-js/faker";

const createCandidate: Promise<CandidateType[]> = new Promise(
  (resolve, reject) => {
    const candidates = [];
    for (let i = 0; i < 10; i++) {
      const candidateShape = {
        id: i,
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        favourite: faker.datatype.boolean(),
        englishLvl: i % 3 === 0 ? "B1" : i % 3 === 1 ? "A2" : "B2",
        age: String(faker.number.int({ min: 18, max: 50 })),
        studies: faker.person.jobTitle(),
        github: faker.internet.url(),
        website: faker.internet.url(),
        city: faker.location.city(),
        stars: faker.number.int({ min: 0, max: 5 }),
        points: faker.number.int({ min: 20, max: 100 }),
        status:
          i % 3 === 0
            ? "applied"
            : i % 3 === 1
            ? "graded"
            : ("need_information" as "applied" | "need_information" | "graded"),
        skills: faker.helpers.arrayElements([
          "React",
          "Vue",
          "Angular",
          "Node",
          "Express",
          "MongoDB",
          "PostgreSQL",
          "TypeScript",
          "JavaScript",
          "HTML",
          "CSS",
          "SASS",
          "LESS",
          "GraphQL",
          "Apollo",
          "Prisma",
          "NestJS",
          "NextJS",
          "Gatsby",
          "Jest",
          "Cypress",
          "Git",
          "GitHub",
        ]),
      };
      candidates.push(candidateShape);
    }
    resolve(candidates);
  }
);

async function main() {
  await createCandidate.then(async (candidates) => {
    for (const candidate of candidates) {
      const skillIds = [];
      for (const skillName of candidate.skills) {
        const skill = await prisma.skill.upsert({
          where: { name: skillName },
          update: {},
          create: { name: skillName },
        });
        skillIds.push(skill.id);
      }

      await prisma.candidate.upsert({
        where: { id: candidate.id },
        update: {},
        create: {
          ...candidate,
          skills: {
            create: skillIds.map((id) => ({
              skillId: id,
            })),
          },
        },
      });
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("ERROR", error);
    await prisma.$disconnect();
    process.exit(1);
  });
