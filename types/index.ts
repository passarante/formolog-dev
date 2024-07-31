import { Prisma } from "@prisma/client";

export type DatabaseWithWorkFlow = Prisma.DatabaseGetPayload<{
    include: {
        workflow: true;
    };
}>;