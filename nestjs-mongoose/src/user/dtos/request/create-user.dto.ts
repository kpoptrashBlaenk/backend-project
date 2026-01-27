import z from 'zod';
import { createZodDto } from 'nestjs-zod';

const createUserBodyDtoSchema = z.object({
  name: z.string(),
  age: z.number().min(1).max(120),
});

export class CreateUserBodyDto extends createZodDto(createUserBodyDtoSchema) {}
