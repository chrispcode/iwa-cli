export const replaceIwaContentRegex = /(?<=<script id="iwa">)([\s\S]*?)(?=<\/script>)/gm;

export function replaceIWA(input: string, data: {}) {
  return input.replace(
    replaceIwaContentRegex,
    `window.env = ${JSON.stringify(data)}`,
  );
}

export function removeIWA(input: string) {
  return input.replace(
    replaceIwaContentRegex,
    '',
  );
}
