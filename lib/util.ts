export function url(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH}/${path}`;
}

export function nl2br(str: string) {
  return str.replace(/\r\n/g, "<br />").replace(/(\n|\r)/g, "<br />");
}

export function extractDescription(raw: string) {
  return raw
    .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
    .replace(/\r?\n/g, "")
    .slice(0, 100);
}
