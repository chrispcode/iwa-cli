import { Command, flags as flagTypes } from '@oclif/command';

import fs from 'fs';
import { load } from 'cheerio';
import path from 'path';

class RemoveCommand extends Command {
  static aliases = ['rm'];

  static description = 'Removes injected configuration from a HTML file';

  static flags = {
    version: flagTypes.version({ char: 'v' }),
    help: flagTypes.help({ char: 'h' }),
    noFormat: flagTypes.boolean({
      default: false,
      description: 'Don\'t format the html file',
    }),
  }

  static args = [
    { name: 'input' },
  ]

  async run() {
    const { args, flags } = this.parse(RemoveCommand);
    const { input } = args;

    const inputLocation = path.join(process.cwd(), input);

    const inputContent = fs.readFileSync(
      inputLocation, {
        encoding: 'utf-8',
      },
    );

    let outputContent: string | null = '';

    if (flags.noFormat) {
      outputContent = inputContent.replace(
        /<script id="iwa">([\s\S]*?)<\/script>/gm,
        '<script id="iwa"></script>',
      );
    } else {
      const $ = load(
        inputContent, {
          _useHtmlParser2: true,
        },
      );

      $('#iwa').html('');

      outputContent = $.root().html();
    }


    fs.writeFileSync(
      inputLocation,
      outputContent,
    );
  }
}

export = RemoveCommand;
