import { z } from 'zod';

// form zod validation schema
export const createCheckinManaul = z.object({
    EmpCode: z.string().min(1, { message: "ເລຶອກ ດ້ວຍ" }),
    Punch_time: z.string({ required_error: "ເລືອກວັນທີ" }).min(1, { message: "ເລືອກວັນທີ" }).nullable(),
    Comments: z.string().min(1, { message: "ປ້ອນ ດ້ວຍ" }),
});

// generate form types from zod validation schema
export type CreateCheckinManaulInput = z.infer<typeof createCheckinManaul>;
