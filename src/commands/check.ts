import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import { Command, flags as flagTypes } from '@oclif/command';
import { hasIWAConfig } from '../helpers';

const sgf = require('staged-git-files');

interface StagedFile {
  filename: string;
  status: string;
}

function getHtmlFromInput(inputFilePath: string) {
  const inputLocation = path.join(process.cwd(), inputFilePath);
  return fs.readFileSync(inputLocation, {
    encoding: 'utf-8',
  });
}

class CheckCommand extends Command {
  static aliases = ['check', 'c'];

  static description =
    'Checks HTML file for injected iwa config, useful in a pre-commit hook to prevent commiting injected iwa-config.';

  static flags = {
    isStaged: flagTypes.boolean({
      char: 's',
      description: 'Checks only staged files, and will throw error if config found',
      default: false,
    }),
    verbose: flagTypes.boolean({ char: 'd' }),
    version: flagTypes.version({ char: 'v' }),
    help: flagTypes.help({ char: 'h' }),
  };

  static args = [{ name: 'input' }];

  handleNoConfigFound(inputFilePath: string) {
    this.log(
      chalk.cyanBright`No iwa config found in ${inputFilePath}!`,
    );
  }

  handleConfigFoundAndStaged(inputFilePath: string) {
    this.log(
      chalk.redBright`iwa config found in ${inputFilePath} file!`,
    );
    this.error(`Remove iwa config from ${inputFilePath}!`, { exit: 2 });
  }

  handleConfigFound(inputFilePath: string) {
    this.log(
      chalk.cyanBright`iwa config found in ${inputFilePath} file!`,
    );
  }

  checkInputForIwaConfig(inputFilePath: string, isStaged?: boolean) {
    const indexHtml = getHtmlFromInput(inputFilePath);

    if (!indexHtml) {
      this.log(chalk.redBright`Could not find ${inputFilePath} file!`);
    }

    if (hasIWAConfig(indexHtml)) {
      if (isStaged) {
        this.handleConfigFoundAndStaged(inputFilePath);
        return;
      }
      this.handleConfigFound(inputFilePath);
      return;
    }

    this.handleNoConfigFound(inputFilePath);
  }

  handleStagedFiles(stagedFiles: StagedFile[], inputFilePath: string) {
    const isInputFileStaged = stagedFiles?.find(
      (file: any) => file.filename === inputFilePath,
    );

    if (isInputFileStaged) {
      this.checkInputForIwaConfig(inputFilePath, true);
    } else {
      this.log(
        chalk.cyanBright`${inputFilePath} is not staged. Not checking for IWA config.`,
      );
    }
  }

  async run() {
    const { flags: { isStaged }, args } = this.parse(CheckCommand);
    const { input } = args;

    if (isStaged) {
      const stagedFiles = await sgf();
      this.handleStagedFiles(stagedFiles, input);
    } else {
      this.checkInputForIwaConfig(input);
    }
  }
}

export default CheckCommand;
