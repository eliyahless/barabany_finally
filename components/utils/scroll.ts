export function scrollToIdWithOffset(id: string, offset: number = 12) {
  const el = document.getElementById(id)
  const header = document.querySelector('header')
  if (el) {
    const headerHeight = header ? header.getBoundingClientRect().height : 0
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
} 