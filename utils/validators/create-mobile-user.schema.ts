import { z } from 'zod';

// form zod validation schema
export const createMobileUser = z.object({
    user_id: z.number().optional(),
    location_id: z.number({ required_error: "ກະລຸນາເລືອກສະຖານທີ່" }),
    work_area_id: z.number({ required_error: "ກະລຸນາເລືອກສະຖານທີ່" }),
});

// generate form types from zod validation schema
export type CreateMobileUserkInput = z.infer<typeof createMobileUser>;
