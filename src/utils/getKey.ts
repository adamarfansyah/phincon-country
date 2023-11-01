export default function getKey(keys: Record<string, string>): string {
  const key = Object.keys(keys);
  const result = key.map((item) => keys[item]);

  return result.join("");
}
