export const replaceIwaContentRegex = /(?<=<script id="iwa">)([\s\S]*?)(?=<\/script>)/gm;

export const toWindowEnvString = (data: object) => `window.env = ${JSON.stringify(data)}`;

export const replaceIwaContent = (htmlFile: string, data: object | '') => htmlFile.replace(
  replaceIwaContentRegex,
  data === '' ? '' : toWindowEnvString(data),
);
