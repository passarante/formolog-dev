import * as z from "zod"



export const createWorkflowSchema = z.object({
    name: z.string({ message: "Proje adı gereklidir." }).min(3, { message: "Proje Adı En az 3 karakter olmalıdır." }),
    companyName: z.string({ message: "Firma adı gereklidir." }).min(3, { message: "Firma Adı En az 3 karakter olmalıdır." }),
    description: z.optional(z.string().min(3)),
})