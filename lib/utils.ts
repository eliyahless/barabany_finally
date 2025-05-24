// Утилита для объединения CSS-классов (аналог clsx)
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
} 