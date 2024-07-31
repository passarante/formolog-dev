"use server";
import { createDatabaseSchema } from './../schemas/index';

import prisma from "@/lib/db";
import { createWorkflowSchema } from "@/schemas";
import * as z from "zod";

export const getUserDatabases = async (userId: string) => {

    try {

        const response = await prisma.database.findMany({
            where: {
                userId
            },
            include: {
                workflow: true
            }
        });



        return { data: response, success: true }

    } catch (error) {
        console.log("Error", error);

        return { error };
    }
}

export const createDatabase = async (data: z.infer<typeof createDatabaseSchema>, userId: string) => {

    try {
        const isExistings = await prisma.database.findMany({
            where: {
                name: data.name,
                userId,

            }
        })

        const isConnected = await prisma.database.findMany({
            where: {
                workflowId: data.workflowId
            }
        })

        if (isExistings.length > 0) {
            return { error: "Bu isimde bir veritabanı zaten mevcut", success: false }
        }

        if (isConnected.length > 0) {
            return { error: "Bu proje için bir veritabanı zaten mevcut", success: false }
        }

        const response = await prisma.database.create({
            data: {
                name: data.name,
                workflowId: data.workflowId,
                description: data.description,
                userId
            }
        })

        return { data: response, success: true }


    } catch (error) {
        console.log("Error", error);
        return { error: JSON.stringify(error) };
    }
}

export const deleteUserDatabase = async (id: string) => {
    try {
        const response = await prisma.database.delete({
            where: {
                id
            }
        });
        return { success: true, data: response }
    } catch (error) {
        return { error: JSON.stringify(error) };
    }
}

export const getDatabase = async (id: string) => {
    try {
        const response = await prisma.database.findUnique({
            where: {
                id
            }
        });
        return { success: true, data: response }
    } catch (error) {
        return { error: JSON.stringify(error) };
    }
}