import { appRouter } from "@/server/api/root";
import { mockDeep } from "jest-mock-extended";

import { type CandidateType } from "@/types/CandidateType";
import { type Candidate, type PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";

describe("candidate procedures", () => {
  it("should get a candidate by id", async () => {
    const prismaMock = mockDeep<PrismaClient>();

    const session: Session = {
      expires: "1",
      user: {
        id: "2137",
        email: "",
        image: "",
        name: "",
      },
    };

    const caller = appRouter.createCaller({
      session,
      prisma: prismaMock,
    });

    const candidateData = {
      id: 2137,
      age: "20",
      city: "string",
      englishLvl: "B2",
      favourite: true,
      github: "string",
      name: "string",
      points: 1,
      status: "applied" as CandidateType["status"],
      stars: 1,
      studies: "string",
      surname: "string",
      website: "string",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const input = {
      ...candidateData,
      skills: ["string", "string"],
    };

    // prismaMock.candidate.findUnique.mockResolvedValue(mockOutput);
    const createCandidate = await caller.candidate.createCandidate(input);

    const candidateById = await caller.candidate.getCandidateById({
      id: 11,
    });

    expect(createCandidate).toBeCalled();
    // expect(candidateById).toStrictEqual(mockOutput);
    // expect(candidateById).toHaveProperty("id", 2137);
  });
});
