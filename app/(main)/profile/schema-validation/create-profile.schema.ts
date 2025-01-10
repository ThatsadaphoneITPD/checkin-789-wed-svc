import { z } from 'zod';

// form zod validation schema
export const createProfileSchema = z.object({
  // base Employee Info
  empoyee_code: z.number().optional(),
  frist_name: z.string().min(1, { message: 'ກະລຸນາ ປ້ອນຫົວຂໍ້' }),
  last_name: z.string().min(1, { message: 'ກະລຸນາ ປ້ອນຫົວຂໍ້' }),
  postion: z.string().min(1, { message: 'ກະລຸນາ ປ້ອນຫົວຂໍ້' }),
  // Department Infomation
  department: z.string().optional(),
  division: z.string().optional(),
  center_service_unit: z.string().optional(),
  unit: z.string().optional(),
  // Contract Info
  tel_phone: z.number().optional(),
  whatapp: z.number().optional(),
  email: z.string().optional(),
  // Deputy
  deputy_one: z.string().optional(),
  deputy_two: z.string().optional(),
  deputy_three: z.string().optional(),
  deputy_four: z.string().optional(),
});

// generate form types from zod validation schema
export type CreateProfileInput = z.infer<typeof createProfileSchema>;
