iwa-cli
=======

An ImmutableWebApp CLI using oclif and cosmiconfig

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/iwa-cli.svg)](https://npmjs.org/package/iwa-cli)
[![Downloads/week](https://img.shields.io/npm/dw/iwa-cli.svg)](https://npmjs.org/package/iwa-cli)
[![License](https://img.shields.io/npm/l/iwa-cli.svg)](https://github.com/chrispcode/iwa-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g iwa-cli
$ iwa COMMAND
running command...
$ iwa (-v|--version|version)
iwa-cli/0.1.0 darwin-x64 node-v10.15.0
$ iwa --help [COMMAND]
USAGE
  $ iwa COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`iwa generate [INPUT] [OUTPUT]`](#iwa-generate-input-output)
* [`iwa remove [INPUT]`](#iwa-remove-input)

## `iwa generate [INPUT] [OUTPUT]`

Generates a HTML file, where window.env configuration is injected

```
USAGE
  $ iwa generate [INPUT] [OUTPUT]

OPTIONS
  -e, --env=env  [default: production]
  -h, --help     show CLI help
  -v, --version  show CLI version

ALIASES
  $ iwa gen
  $ iwa g
```

_See code: [src/commands/generate.ts](https://github.com/chrispcode/iwa-cli/blob/v0.1.0/src/commands/generate.ts)_

## `iwa remove [INPUT]`

Removes injected configuration from a HTML file

```
USAGE
  $ iwa remove [INPUT]

OPTIONS
  -h, --help     show CLI help
  -v, --version  show CLI version

ALIASES
  $ iwa rm
```

_See code: [src/commands/remove.ts](https://github.com/chrispcode/iwa-cli/blob/v0.1.0/src/commands/remove.ts)_
<!-- commandsstop -->
