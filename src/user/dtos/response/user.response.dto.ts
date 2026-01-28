import z from 'zod';
import { createZodDto } from 'nestjs-zod';

export const userResponseSchema = z.object({
  name: z.string(),
  age: z.number(),
});

export class UserResponseDto extends createZodDto(userResponseSchema) {}
