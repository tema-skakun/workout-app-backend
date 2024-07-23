// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    PORT?: string;
    JWT_SECRET: string;
  }
}
