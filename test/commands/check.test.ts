import { expect, test } from '@oclif/test';

import { mocked } from 'ts-jest/utils';
import path from 'path';

import fs from 'fs';
import { html } from 'common-tags';
import { resetEntryFile } from './helpers';

const sgf = require('staged-git-files');

const mockedSGF = mocked(sgf);
const entryFilePath = path.join(__dirname, '../index.html');

const TEST_FILE = './test/index.html';

jest.mock('staged-git-files', () => jest.fn());

function mockGitStagedFiles() {
  mockedSGF.mockClear();
  mockedSGF.mockImplementationOnce(() => [
    { filename: './test/index.html', status: 'Modified' },
  ]);
}

function addConfigToTestFile() {
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
}

describe('IWA Check command', () => {
  beforeEach(() => {
    resetEntryFile();
  });

  afterAll(() => {
    resetEntryFile();
  });

  test
    .stdout()
    .command(['check', TEST_FILE])
    .it('Check find no config if non exist',
      (ctx) => expect(ctx.stdout).to.contain(`No iwa config found in ${TEST_FILE}!`));

  test
    .do(() => addConfigToTestFile())
    .stdout()
    .command(['check', TEST_FILE])
    .it('Check find config if it exist',
      (ctx) => expect(ctx.stdout).to.contain(`iwa config found in ${TEST_FILE} file!`));

  test
    .do(() => addConfigToTestFile())
    .stdout()
    .command(['check', '-s', TEST_FILE])
    .it('Won\'t check iwa config if not staged',
      (ctx) => expect(ctx.stdout).to.contain(`${TEST_FILE} is not staged. Not checking for IWA config.`));

  test
    .do(() => mockGitStagedFiles())
    .stdout()
    .command(['check', '-s', TEST_FILE])
    .it('Won\'t throw error if file is staged but no injected iwa-config',
      (ctx) => expect(ctx.stdout).to.contain(`No iwa config found in ${TEST_FILE}!`));

  test
    .do(() => {
      mockGitStagedFiles();
      addConfigToTestFile();
    })
    .stderr()
    .stdout()
    .command(['check', '-s', TEST_FILE])
    .catch(((error) => {
      expect(error.message).to.contain(`Remove iwa config from ${TEST_FILE}!`);
    }))
    .it('Throws error if file is staged and has injected iwa-config', (ctx) => {
      expect(ctx.stdout).to.contain(`iwa config found in ${TEST_FILE} file!`);
    });
});
