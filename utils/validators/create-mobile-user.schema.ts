import { z } from 'zod';

// form zod validation schema
export const createMobileUser = z.object({
    status: z.string().min(1, { message: "ຂໍ້ມູນວ່າງເປົ່າ" }).min(3, { message: "ເລຶອກສະຖານາ" }),
    comments: z.string().min(1, { message: "ປະກອບຄຳເຫັນ ດ້ວຍ" }).min(3, { message: "ປ້ອນຄຳເຫັນ" }),
});

// generate form types from zod validation schema
export type CreateMobileUserkInput = z.infer<typeof createMobileUser>;
