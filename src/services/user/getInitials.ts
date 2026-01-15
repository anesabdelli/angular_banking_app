export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)          // split by spaces
    .map(word => word[0])  // take first letter
    .join('')
    .toUpperCase();
}


