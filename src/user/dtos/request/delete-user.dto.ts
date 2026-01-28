import { createZodDto } from 'nestjs-zod';
import { userIdSchema } from './common.dto';
import z from 'zod';

export class DeleteUserParamsDto extends createZodDto(
  z.object({ id: userIdSchema }),
) {}
