#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const program = require('commander');
const chalk = require('chalk');
const sgf = require('staged-git-files');
const { version } = require('../package.json');

const PUBLIC_INDEX_PATH = 'public/index.html';
const check = (props) => {
  sgf((stageErrors, stagedFiles) => {
    if (stageErrors) {
      console.log(
        chalk.redBright`Error when checking staged files: ${stageErrors}`,
      );
    }

    const indexIsStaged = stagedFiles?.find(
      (file) => file.filename === PUBLIC_INDEX_PATH,
    );
    if (indexIsStaged) {
      const indexHtml = fs.readFileSync(PUBLIC_INDEX_PATH, {
        encoding: 'utf-8',
      });

      if (!indexHtml) {
        console.log(chalk.redBright`Could not find a public/index.html file!`);
      }

      const match = indexHtml.match(
        /(?<=<script id="iwa">)([\s\S]*?)(?=<\/script>)/gm,
      );

      if (match && match[0] !== '') {
        if (props.cleanIndex) {
          console.log(
            chalk.redBright`iwa config found in public/index.html file!`,
          );
          throw Error('Remove iwa config from public/index.html!');
        } else {
          console.log(
            chalk.cyanBright`iwa config found in public/index.html file!`,
          );
        }
      } else {
        console.log(
          chalk.cyanBright`No iwa config found in public/index.html!`,
        );
      }
    }
  });
};

async function main() {
  program
    .version(version)
    .option('--cleanIndex', 'should throw error if iwa properties is present')
    .action(check);

  await program.parseAsync(process.argv);
}

main();
