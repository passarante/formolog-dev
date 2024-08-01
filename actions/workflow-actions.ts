"use server";

import prisma from "@/lib/db";
import { createWorkflowSchema } from "@/schemas";
import * as z from "zod";

export const getUserWorkflows = async (userId: string) => {

    try {

        const response = await prisma.workFlow.findMany({
            where: {
                userId
            },
        });



        return { data: response, success: true }

    } catch (error) {
        console.log("Error", error);

        return { error };
    }
}

export const createWorkFlow = async (data: z.infer<typeof createWorkflowSchema>, userId: string) => {
    console.log(data);
    try {
        const isExistings = await prisma.workFlow.findMany({
            where: {
                name: data.name,
                userId
            }
        })

        if (isExistings.length > 0) {
            return { error: "Bu isimde bir workflow zaten mevcut", success: false }
        }


        const response = await prisma.workFlow.create({
            data: {
                name: data.name,
                company: data.companyName,
                description: data.description,
                userId
            }
        })

        return { data: response, success: true }


    } catch (error) {
        console.log("Error", JSON.stringify(error));
        return { error: JSON.stringify(error) };
    }
}

export const deleteUserWorkflow = async (workflowId: string) => {

    try {
        const response = await prisma.workFlow.delete({
            where: {
                id: workflowId
            }
        });
        return { success: true, data: response }
    } catch (error) {
        console.log("Error", error);
        return { success: false, error: "Sunucu hatası lütfen tekrar deneyin" }
    }
}