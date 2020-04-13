import { Command, flags as flagTypes } from '@oclif/command';
import path from 'path';
import fs from 'fs';
import { load } from 'cheerio';

class RemoveCommand extends Command {
  static aliases = ['rm'];

  static description = 'Removes injected configuration from a HTML file';

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

    const $ = load(
      inputContent, {
        _useHtmlParser2: true,
      },
    );

    $('#iwa').html('');

    const outputContent = $.root().html();

    fs.writeFileSync(
      inputLocation,
      outputContent,
    );
  }
}

export = RemoveCommand;
