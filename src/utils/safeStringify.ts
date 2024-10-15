export function safeStringify(obj: any): string {
  return JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint'
      ? value.toString()
      : value instanceof Map
      ? Object.fromEntries(value)
      : value instanceof Set
      ? Array.from(value)
      : value
  );
}

export function safeParse(str: string): any {
  return JSON.parse(str);
}