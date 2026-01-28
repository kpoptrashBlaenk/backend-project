import z from 'zod'

const envSchema = z.object({
  APP_API_PORT: z.coerce.number().min(1),
  APP_API_KEY: z.string().min(1),

  MONGODB_URI: z.string().startsWith('mongodb://'),
})

export type EnvironmentConfig = z.output<typeof envSchema>

export function validate(config: Record<string, unknown>) {
  return envSchema.parse(config)
}
