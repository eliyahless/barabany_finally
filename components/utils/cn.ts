// Утилита cn — безопасный аналог classNames для tailwind/React
export function cn(...args: any[]): string {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(" ")
} 