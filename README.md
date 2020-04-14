iwa-cli
=======

![IWA](https://user-images.githubusercontent.com/7029482/79209827-35942a80-7e44-11ea-908a-0a9d54f62779.png)

An ImmutableWebApp CLI using oclif and cosmiconfig

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/iwa-cli.svg)](https://npmjs.org/package/iwa-cli)
[![Downloads/week](https://img.shields.io/npm/dw/iwa-cli.svg)](https://npmjs.org/package/iwa-cli)
[![License](https://img.shields.io/npm/l/iwa-cli.svg)](https://github.com/chrispcode/iwa-cli/blob/master/package.json)

<!-- toc -->
* [Installation](#installation)
* [or](#or)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Installation
<!-- installation -->
```sh-session
yarn add --dev iwa-cli

# or

npm install --save-dev iwa-cli
```
<!-- installationstop -->

# Usage

## Generate
1. Create a `.iwarc` file in the root of your project.
The format of this file should look like this.

```json
{
  "env": {
    "production": {
      "KEY": "VALUE_PRODUCTION"
    },
    "development": {
      "KEY": "VALUE_DEVELOPMENT"
    }
  }
}
```
* The `production` environment cannot be omitted!
* Specify as many environments as you need! In this case we have 2 (one for production and one for development)
* Always specify the same keys in all environments!

2. Create a script tag with `id="iwa"` in your index.html or template.index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <div id="menu"></div>
    <main id="root"></main>
    <div id="footer"></div>

    <script id="iwa"></script> <!-- This line here is the one -->
  </body>
</html>
```

* Make sure you don't have anything it, because it will get erased!
* Make sure it is placed before all you bundles!

3. Run the `generate` command

```sh-session
iwa generate --env=production ./example/index.html  # or the location where the file is located
```

The command will inject the configuration in the script tag:

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <div id="menu"></div>
    <main id="root"></main>
    <div id="footer"></div>
    <script id="iwa">window.env = {"KEY":"VALUE_PRODUCTION"}</script>
  </body>
</html>
```

## Override
You can override a variable with process.env variables:

```sh-session
KEY="VALUE_PROCESS" iwa generate ./example/index.html
```

## Remove
You can also erase the configuration from a file, by using the `remove` command

```sh-session
iwa remove ./example/index.html
```

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
