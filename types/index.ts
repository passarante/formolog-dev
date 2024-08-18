import { Prisma } from "@prisma/client";

export type DatabaseWithWorkFlow = Prisma.DatabaseGetPayload<{
    include: {
        workflow: true;
    };
}>;



export type Model = {
    name: string;
    fields: {
        name: string;
        type: string;
        hasConnections?: boolean;
        description?: string;
        isIdentity?: boolean;
        isNullable?: boolean;
        isUnique?: boolean;
        length?: number;
        isDefault?: boolean;
    }[];
    isChild?: boolean;
};
export type DbTableType = {
    name: string;
    description?: string;
    fields: {
        name: string;
        description?: string;
        type: string;
        hasConnections?: boolean | number;
        foreignKey?: string;
        isIdentity?: boolean | number;
        isNullable?: boolean | number;
        isUnique?: boolean | number;
        length?: number;
        isDefault?: boolean | number;
    }[];
    isChild?: boolean | number;
};



export type ModelConnection = {
    target: string;
    source: string;
    name: string;
};