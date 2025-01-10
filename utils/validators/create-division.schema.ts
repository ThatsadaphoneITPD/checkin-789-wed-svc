import { z } from 'zod';

// form zod validation schema
export const createDivisionSchema = z.object({
    name: z.string().min(1, { message: "ຂໍ້ມູນວ່າງເປົ່າ" }).min(3, { message: "ຊື່ແທັກນ້ອຍເກີນໄປ" }),
});

// generate form types from zod validation schema
export type CreateDivisionInput = z.infer<typeof createDivisionSchema>;
