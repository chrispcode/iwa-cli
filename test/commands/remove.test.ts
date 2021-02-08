import path from 'path';
import fs from 'fs';
import { html } from 'common-tags';

import RemoveCommand from '../../src/commands/remove';

const entryFilePath = path.join(__dirname, '../index.html');

describe('iwa remove', () => {
  it('should remove any configuration', async () => {
    const baseState = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <script id="iwa">window.env = {"KEY":"VALUE_PRODUCTION"}</script>
      </body>
    </html>
  `;

    fs.writeFileSync(
      entryFilePath,
      baseState,
    );

    await RemoveCommand.run(['./test/index.html']);

    const result = fs.readFileSync(entryFilePath, {
      encoding: 'utf-8',
    });

    const expected = html`
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

    expect(result).toBe(expected);
  });

  it('should not edit the file if no iwa is present', async () => {
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

    await RemoveCommand.run(['./test/index.html']);

    const result = fs.readFileSync(entryFilePath, {
      encoding: 'utf-8',
    });

    expect(result).toBe(baseState);
  });
});
