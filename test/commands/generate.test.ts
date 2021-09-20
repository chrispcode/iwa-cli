import path from 'path';
import fs from 'fs';
import { html } from 'common-tags';

import GenerateCommand from '../../src/commands/generate';
import { resetEntryFile } from './helpers';

const entryFilePath = path.join(__dirname, '../index.html');
const iwarcFile = path.join(__dirname, '../.iwarc.json');

describe('iwa generate', () => {
  beforeEach(() => {
    resetEntryFile();
  });

  afterAll(() => {
    resetEntryFile();
  });

  it('should inject by default with env production', async () => {
    await GenerateCommand.run(['./test/index.html', '-c', iwarcFile]);

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
          <script id="iwa">window.env = {"KEY":"VALUE_PRODUCTION"}</script>
        </body>
      </html>
    `;

    expect(result).toBe(expected);
  });

  it('should inject with env development', async () => {
    await GenerateCommand.run(['./test/index.html', '-c', iwarcFile, '-e', 'development']);

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
          <script id="iwa">window.env = {"KEY":"VALUE_DEVELOPMENT"}</script>
        </body>
      </html>
    `;

    expect(result).toBe(expected);
  });

  it('should inject with env client-t', async () => {
    await GenerateCommand.run(['./test/index.html', '-c', iwarcFile, '-e', 'client-t']);

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
          <script id="iwa">window.env = {"KEY":"VALUE_CLIENT_T"}</script>
        </body>
      </html>
    `;

    expect(result).toBe(expected);
  });

  it('should override from one env to another', async () => {
    await GenerateCommand.run(['./test/index.html', '-c', iwarcFile, '-e', 'production']);

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
          <script id="iwa">window.env = {"KEY":"VALUE_PRODUCTION"}</script>
        </body>
      </html>
    `;

    expect(result).toBe(expected);

    await GenerateCommand.run(['./test/index.html', '-c', iwarcFile, '-e', 'client-t']);

    const result2 = fs.readFileSync(entryFilePath, {
      encoding: 'utf-8',
    });

    const expected2 = html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <script id="iwa">window.env = {"KEY":"VALUE_CLIENT_T"}</script>
        </body>
      </html>
    `;

    expect(result2).toBe(expected2);
  });
});
