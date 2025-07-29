import { z } from 'zod';

// form zod validation schema
export const createWorkAreaSchema = z.object({
    work_area_id: z.number().optional(),
    area_name: z.string().min(1, { message: "ຂໍ້ມູນວ່າງເປົ່າ" }).min(3, { message: "ຊື່ແທັກນ້ອຍເກີນໄປ" }),
    latitude: z.number(),
    longitude: z.number(),
    location_id: z.number({ required_error: "ກະລຸນາເລືອກສະຖານທີ່" }),
    radius_km: z.number(),
});

// generate form types from zod validation schema
export type CreateWorkAreaInput = z.infer<typeof createWorkAreaSchema>;
