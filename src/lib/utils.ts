import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fadeIn = "animate-in fade-in duration-200 fill-mode-both";

export function validateEnvVars() {
  const requiredEnvVars = ["HASHNODE_HOST", "NEXT_PUBLIC_HASHNODE_PROJECT_SERIES_SLUG"];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(
        `Missing environment variable: ${envVar}. If working locally, make sure to create a .env.local file. If running in Vercel, make sure to add the environment variable in the Vercel dashboard.`,
      );
    }
  }
}
