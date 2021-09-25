import { html } from 'common-tags';
import fs from 'fs';
import path from 'path';

const entryFilePath = path.join(__dirname, '../index.html');

export function resetEntryFile() {
  const baseState = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <script id="iwa"></script>
      </body>
    </html>
  `;

  fs.writeFileSync(
    entryFilePath,
    baseState,
  );
}

export default resetEntryFile;
