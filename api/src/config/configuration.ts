export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '4000', 10),
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessTtl: parseInt(process.env.JWT_ACCESS_TTL ?? '900', 10),
    refreshTtl: parseInt(process.env.JWT_REFRESH_TTL ?? '2592000', 10),
  },
  redisUrl: process.env.REDIS_URL,
  ai: {
    baseUrl: process.env.AI_LLM_BASE_URL,
    apiKey: process.env.AI_LLM_API_KEY,
    model: process.env.AI_LLM_MODEL ?? 'gpt-4.1-mini',
  },
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  allowedOrigins: process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000',
});

