import z from 'zod';

const requireString = (name: string) =>
  z
    .string()
    .trim()
    .min(1, { message: name + 'is require' });

export const loginSchema = z.object({
  userName: requireString('username'),
  password: requireString('password').min(8),
});

export type LoginValue = z.infer<typeof loginSchema>;
