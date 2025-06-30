import { z } from 'zod';

// form zod validation schema
export const createCheckinManaul = z.object({
    emp_code: z.string().min(1, { message: "ຂໍ້ມູນວ່າງເປົ່າ" }).min(3, { message: "ເລຶອກສະຖານາ" }),
    check_date: z.string().nullable(),
    status_in_out: z.string().min(1, { message: "ຂໍ້ມູນວ່າງເປົ່າ" }).min(3, { message: "ເລຶອກສະຖານາ" }),
    reason: z.string().min(1, { message: "ປະກອບຄຳເຫັນ ດ້ວຍ" }).min(3, { message: "ປ້ອນຄຳເຫັນ" }),
});

// generate form types from zod validation schema
export type CreateCheckinManaulInput = z.infer<typeof createCheckinManaul>;
