import { prisma } from "@/server/db";
import { faker } from "@faker-js/faker";
import { type TCandidate } from "@/schema/candidate";

const createCandidate: Promise<TCandidate[]> = new Promise(
  (resolve, reject) => {
    const candidates = [];
    for (let i = 0; i < 10; i++) {
      const candidateShape = {
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        bio: faker.lorem.paragraphs({ min: 2, max: 9 }),
        favourite: faker.datatype.boolean(),
        english_level:
          i % 3 === 0 ? "Basic" : i % 3 === 1 ? "Intermediate" : "Fluent",
        age: String(faker.number.int({ min: 18, max: 50 })),
        university: faker.person.jobArea(),
        university_start: faker.date.past().toISOString(),
        university_end: faker.date.future().toISOString(),
        university_degree: faker.person.jobTitle(),
        github_url: faker.internet.url(),
        website_url: faker.internet.url(),
        city: faker.location.city(),
        stars: faker.number.int({ min: 0, max: 5 }),
        points: faker.number.int({ min: 20, max: 100 }),
        interests: faker.helpers.arrayElements([
          "Karate",
          "Football",
          "Basketball",
          "Tennis",
          "Golf",
          "Swimming",
          "Running",
          "Cycling",
          "Hiking",
          "Skiing",
          "Snowboarding",
          "Surfing",
          "Skateboarding",
          "Sailing",
          "Dancing",
          "Singing",
          "Playing guitar",
        ]),
        status:
          i % 3 === 0
            ? "applied"
            : i % 3 === 1
            ? "graded"
            : ("need_information" as "applied" | "need_information" | "graded"),
        skills: faker.helpers.arrayElements([
          "Git",
          "HTML",
          "CSS",
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Express",
          "GraphQL",
          "Apollo",
          "Prisma",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Docker",
          "Kubernetes",
          "AWS",
          "Azure",
          "Google Cloud",
          "Python",
          "Django",
          "Flask",
          "Ruby",
          "Ruby on Rails",
        ]),
      };
      candidates.push(candidateShape);
    }
    resolve(candidates);
  }
);

async function main() {
  const candidates = await createCandidate;
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

    const interestsIds = [];
    for (const interestName of candidate.interests) {
      const interest = await prisma.interest.upsert({
        where: { name: interestName },
        update: {},
        create: { name: interestName },
      });
      interestsIds.push(interest.id);
    }

    await prisma.candidate.create({
      data: {
        ...candidate,
        skills: {
          create: skillIds.map((id) => ({
            skillId: id,
          })),
        },
        interests: {
          create: interestsIds.map((id) => ({
            interestId: id,
          })),
        },
      },
    });
  }
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
