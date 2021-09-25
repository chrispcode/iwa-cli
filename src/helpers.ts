export const getInjectedIwaConfigRegex = /(?<=<script id="iwa">)([\s\S]*?)(?=<\/script>)/gm;

export function replaceIWA(input: string, data: {}) {
  return input.replace(
    getInjectedIwaConfigRegex,
    `window.env = ${JSON.stringify(data)}`,
  );
}

export function removeIWA(input: string) {
  return input.replace(getInjectedIwaConfigRegex, '');
}

export function hasIWAConfig(input: string) {
  const match = input.match(getInjectedIwaConfigRegex);

  return match && match[0] !== '';
}

export function getOverridesFromProcessEnv(cosmicData: { [key: string]: string }) {
  return Object.keys(cosmicData)
    .filter((key: string) => process.env[key])
    .map((key: string) => ({ [key]: process.env[key] }))
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});
}
