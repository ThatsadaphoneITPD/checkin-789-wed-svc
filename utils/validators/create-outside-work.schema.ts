import { z } from 'zod';

// form zod validation schema
export const createOutSideWorkSchema = z.object({
    status: z.string().min(1, { message: "ຂໍ້ມູນວ່າງເປົ່າ" }).min(3, { message: "ເລຶອກສະຖານາ" }),
    comments: z.string().min(1, { message: "ປະກອບຄຳເຫັນ ດ້ວຍ" }).min(3, { message: "ປ້ອນຄຳເຫັນ" }),
});

// generate form types from zod validation schema
export type CreateOutSideWorkInput = z.infer<typeof createOutSideWorkSchema>;
