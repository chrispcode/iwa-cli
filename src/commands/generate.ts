import { Command, flags as flagTypes } from '@oclif/command';
import { cosmiconfig } from 'cosmiconfig';

import fs from 'fs';
import path from 'path';
import { isNull } from 'util';
import { load } from 'cheerio';
import pick from 'lodash.pick';

const explorer = cosmiconfig('iwa');

class GenerateCommand extends Command {
  static aliases = ['gen', 'g'];

  static description = 'Generates a HTML file, where window.env configuration is injected';

  static flags = {
    env: flagTypes.string({
      char: 'e',
      default: 'production',
    }),

    version: flagTypes.version({ char: 'v' }),
    help: flagTypes.help({ char: 'h' }),
  }

  static args = [
    { name: 'input' },
    { name: 'output' },
  ]

  async getData() {
    const { flags } = this.parse(GenerateCommand);
    const cosmic = await explorer.search();

    if (isNull(cosmic)) {
      this.log('Could not find a config file!');
      return {};
    }

    const cosmicData = cosmic.config.env[flags.env];
    const processOverrideData = pick(
      process.env,
      Object.keys(cosmicData),
    );

    return {
      ...cosmicData,
      ...processOverrideData,
    };
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

    const $ = load(
      inputContent, {
        _useHtmlParser2: true,
      },
    );

    $('#iwa').html(`window.env = ${JSON.stringify(data)}`);

    const outputContent = $.root().html();

    fs.writeFileSync(
      outputLocation,
      outputContent,
    );
  }
}

export = GenerateCommand
