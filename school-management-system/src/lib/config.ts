export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME?.trim() || "School Management System",
  useMocks: (process.env.NEXT_PUBLIC_USE_MOCKS ?? "true") === "true",
  defaultCurrency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY?.trim() || "TZS",
} as const;
