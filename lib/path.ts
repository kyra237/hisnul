export function isActiveHref(href: string, currentPathname: string): boolean {
  return href === currentPathname;
}
