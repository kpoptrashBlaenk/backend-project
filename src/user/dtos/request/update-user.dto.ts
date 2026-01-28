import z from 'zod';
import { createZodDto } from 'nestjs-zod';
import { userIdSchema } from './common.dto';

const updateUserBodyDtoSchema = z.object({
  name: z.string(),
  age: z.number().min(1).max(120),
});

export class UpdateUserBodyDto extends createZodDto(updateUserBodyDtoSchema) {}
export class UpdateUserParamsDto extends createZodDto(
  z.object({ id: userIdSchema }),
) {}
