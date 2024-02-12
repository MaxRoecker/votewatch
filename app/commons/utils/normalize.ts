export function normalize<T extends { id: string }>(
  sequence: Iterable<T>,
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const item of sequence) {
    result[item['id']] = item;
  }
  return result;
}
