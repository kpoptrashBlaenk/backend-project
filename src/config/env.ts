import z from 'zod'

const envSchema = z.object({
  APP_API_PORT: z.coerce.number().min(1),
  APP_API_KEY: z.string().min(1),

  // mongodb uri
  MONGODB_URI: z.string().startsWith('mongodb+srv://'),

  // randomly generated jwt secret
  JWT_SECRET: z.string().min(32),
})

export type EnvironmentConfig = z.output<typeof envSchema>

// validate env after initialization
export function validate(config: Record<string, unknown>) {
  return envSchema.parse(config)
}
