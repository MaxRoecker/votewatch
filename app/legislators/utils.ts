import type { Legislator } from './data';

export function getInitials(legislator: Legislator): string {
  const parts = legislator.name.split(' ');
  return parts.map((part) => part[0]).join('');
}
