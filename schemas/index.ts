import * as z from "zod"




export const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    label: z.string(),
    priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>


export const createWorkflowSchema = z.object({
    name: z.string({ message: "Proje adı gereklidir." }).min(3, { message: "Proje Adı En az 3 karakter olmalıdır." }),
    companyName: z.string({ message: "Firma adı gereklidir." }).min(3, { message: "Firma Adı En az 3 karakter olmalıdır." }),
    description: z.optional(z.string().min(3)),
})
export const createDatabaseSchema = z.object({
    name: z.string({ message: "Veritabanu adı gereklidir." }).min(3, { message: "Proje Adı En az 3 karakter olmalıdır." }),
    workflowId: z.string({ message: "Proje adı gereklidir." }),
    description: z.optional(z.string().min(3)),
})