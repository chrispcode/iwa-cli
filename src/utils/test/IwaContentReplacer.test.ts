import {
  replaceIwaContent,
  toWindowEnvString,
} from '../IwaContentReplacer';
import {
  getDivContent,
  indexHtml,
} from './testconstants';

describe('IwaContentReplacer Add/Replace content', () => {
  const newContent = { someContent: 'some string' };

  it('should populate div content if empty', () => {
    const fileWithReplacedContent = replaceIwaContent(indexHtml(''), newContent);
    expect(getDivContent(fileWithReplacedContent)).toBe(toWindowEnvString(newContent));
  });

  it('should replace div content if already populated', () => {
    const oldContent = toWindowEnvString({ oldContent: 'some oldString' });
    const fileWithReplacedContent = replaceIwaContent(indexHtml(oldContent), newContent);
    expect(getDivContent(fileWithReplacedContent)).toBe(toWindowEnvString(newContent));
  });

  it('should replace content looking like existing config', () => {
    const existingConfig = 'window.env = {"SOME_VALUE": "some property", "ANOTHER_VALUE": "another property", "COOL_VALUE": "coolPRopErTy"}';
    const fileWithReplacedContent = replaceIwaContent(indexHtml(existingConfig), newContent);
    expect(getDivContent(fileWithReplacedContent)).toBe(toWindowEnvString(newContent));
  });

  it('should remove div content if multiline content', () => {
    const multilineContent = `window.env = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
    }`;
    const fileWithReplacedContent = replaceIwaContent(indexHtml(multilineContent), newContent);
    expect(getDivContent(fileWithReplacedContent)).toBe(toWindowEnvString(newContent));
  });
});

describe('IwaContentReplacer Remove/empty content', () => {
  it('should empty div content', () => {
    const fileWithReplacedContent = replaceIwaContent(indexHtml(), '');
    expect(getDivContent(fileWithReplacedContent)).toBe('');
  });

  it('should remove div content if multiline content', () => {
    const multilineContent = `window.env = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
    }`;
    const fileWithReplacedContent = replaceIwaContent(indexHtml(multilineContent), '');
    expect(getDivContent(fileWithReplacedContent)).toBe('');
  });
});
