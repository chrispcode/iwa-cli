import fs from 'fs';
import path from 'path';
import pick from 'lodash.pick';
import chalk from 'chalk';

import { cosmiconfig } from 'cosmiconfig';
import { Command, flags as flagTypes } from '@oclif/command';

import { replaceIWA } from '../helpers';

const explorer = cosmiconfig('iwa');

class GenerateCommand extends Command {
  static aliases = ['gen', 'g'];

  static description =
    'Generates a HTML file, where window.env configuration is injected';

  static flags = {
    env: flagTypes.string({
      char: 'e',
      default: 'production',
    }),
    config: flagTypes.string({
      char: 'c',
      description: 'Location to look for iwa configuration',
    }),
    verbose: flagTypes.boolean({ char: 'd' }),
    version: flagTypes.version({ char: 'v' }),
    help: flagTypes.help({ char: 'h' }),
  };

  static args = [{ name: 'input' }, { name: 'output' }];

  async getData() {
    const { flags } = this.parse(GenerateCommand);
    const cosmic = await explorer.search(flags.config);

    if (!cosmic) {
      this.log(chalk.redBright`Could not find a config file!`);
      return {};
    }

    const env = process.env.ENV || flags.env;

    this.log(chalk.cyanBright(`Specified environment - "${env}".`));

    const cosmicDefaultData = cosmic.config.env.all || {};
    const cosmicData = cosmic.config.env[env];

    const processOverrideData = pick(process.env, Object.keys(cosmicData));
    const iwaConfig = {
      ...cosmicDefaultData,
      ...cosmicData,
      ...processOverrideData,
    };

    if (flags.verbose) {
      this.log(chalk.cyanBright('Uses verbose output '));
      this.log(chalk.cyanBright('Generated config:'));
      this.log(chalk.cyanBright(JSON.stringify(iwaConfig, null, 4)));
    }

    return iwaConfig;
  }

  async run() {
    const { args } = this.parse(GenerateCommand);

    const { input } = args;
    const output = args.output || input;

    const data = await this.getData();
    const inputLocation = path.join(process.cwd(), input);
    const outputLocation = path.join(process.cwd(), output);

    const inputContent = fs.readFileSync(
      inputLocation, {
        encoding: 'utf-8',
      },
    );

    const outputContent = replaceIWA(inputContent, data);
    fs.writeFileSync(outputLocation, outputContent);

    this.log(
      chalk.greenBright`File with injected configuration was generated!`,
    );
  }
}

export = GenerateCommand;
