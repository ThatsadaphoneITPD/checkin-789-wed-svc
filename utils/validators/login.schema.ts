import { z } from 'zod';

// form zod validation schema
export const loginSchema = z.object({
  // email: z.string().email(),
  username: z.string().min(5, 'ກະລຸນາ ລະຫັດພະນັກງານ'),
  password: z.string().min(5, 'ກະລຸນາປ້ອນລະຫັດຜ່ານ'),
});
export type LoginSchema = z.infer<typeof loginSchema>;

// Users schema----------------------------------------------------------------
export const userSchema = z.object({
  username: z.string().min(5, 'ກະລຸນາປ້ອນລະຫັດພະນັກງານ'),
  password: z.string().min(5, 'ກະລຸນາປ້ອນລະຫັດຜ່ານ').optional(),
  email: z.string().optional(),
  emp_id: z.number().min(1, 'ກະລຸນາເລືອກພະນັກງານ'),
  role_id: z.number().min(1, 'ກະລຸນາເລືອກາສິດໃຊ້ງານ'),
});

export type UserInput = z.infer<typeof userSchema>;
