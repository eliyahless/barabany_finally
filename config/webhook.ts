export const WEBHOOK_CONFIG = {
  url: process.env.NEXT_PUBLIC_WEBHOOK_URL || '',
  fallbackToGoogleSheets: process.env.NEXT_PUBLIC_FALLBACK_TO_SHEETS === 'true',
  googleSheetsId: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || '',
} 