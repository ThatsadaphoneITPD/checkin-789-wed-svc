import { z } from 'zod';

// form zod validation schema
export const createCheckinManaul = z.object({
    emp_code: z.string().min(1, { message: "ເລຶອກ ດ້ວຍ" }),
    check_date: z.string({ required_error: "ເລືອກວັນທີ" }).min(1, { message: "ເລືອກວັນທີ" }).nullable(),
    status_in_out: z.string().min(1, { message: "ເລືອກ ດ້ວຍ" }),
    reason: z.string().min(1, { message: "ປ້ອນ ດ້ວຍ" }),
});

// generate form types from zod validation schema
export type CreateCheckinManaulInput = z.infer<typeof createCheckinManaul>;
