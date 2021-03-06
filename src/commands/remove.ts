import fs from 'fs';
import path from 'path';
import {
  Command,
  flags as flagTypes,
} from '@oclif/command';
import chalk from 'chalk';

import { removeIWA } from '../helpers';

class RemoveCommand extends Command {
  static aliases = ['rm'];

  static description = 'Removes injected configuration from an HTML file';

  static flags = {
    version: flagTypes.version({ char: 'v' }),
    help: flagTypes.help({ char: 'h' }),
  }

  static args = [
    { name: 'input' },
  ]

  async run() {
    const { args } = this.parse(RemoveCommand);
    const { input } = args;

    const inputLocation = path.join(process.cwd(), input);

    const inputContent = fs.readFileSync(
      inputLocation, {
        encoding: 'utf-8',
      },
    );

    const outputContent = removeIWA(inputContent);

    if (outputContent === inputContent) {
      this.log(chalk.yellowBright`No IWA configuration to remove!`);
    } else {
      fs.writeFileSync(
        inputLocation,
        outputContent,
      );

      this.log(chalk.yellowBright`IWA configuration removed from file!`);
    }
  }
}

export = RemoveCommand;
