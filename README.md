# zhistory-ui

A TypeScript library and CLI tool for parsing and displaying Z shell history files.

[![npm Package Version](https://img.shields.io/npm/v/zhistory-ui)](https://www.npmjs.com/package/zhistory-ui)

## Features

- Parse Z shell history files (`~/.zhistory`)
- Display command history with timestamps and execution time
- CLI tool for terminal output, with optional substring search (multiple terms are AND-matched; unique commands only)
- Web UI tool for browser visualization, with a search box (same AND / unique-command behavior as the CLI, in-page filtering)
- TypeScript support with full type definitions
- Isomorphic package: works in Node.js and browsers

## Installation

```bash
npm install -g zhistory-ui
```

Then it can be called with `<command>`

If you don't want to install it globally, you can call it with `npx -p zhistory-ui -y <command>` instead.

You can also install `zhistory-ui` with [pnpm](https://pnpm.io/), or run without installing with `pnpx --package=zhistory-ui zhistory-cli` or `pnpx --package=zhistory-ui zhistory-webui`

## Requirements

- **Node.js**: 12.16+ (for package exports support)
- **TypeScript**: 4.5+ (for subpath import resolution)
- **Z shell**: zsh with history enabled (creates `~/.zhistory`)

### TypeScript Setup

For subpath imports (`'zhistory-ui/fs'`, `'zhistory-ui/core'`), configure your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "node16"
  }
}
```

## Usage

### CLI Tool

Display your Z shell history in the terminal:

```bash
zhistory-cli
```

Search by one or more substrings: every term must appear in the command (order does not matter). Duplicate commands are shown once (first occurrence in time order). The CLI also hides the current `zhistory-cli …` invocation from results when it would match.

```bash
zhistory-cli npm
zhistory-cli git pull
```

### Web UI Tool

View your Z shell history in a browser:

```bash
zhistory-webui
```

Use the search field (top right): enter space-separated terms; every term must appear in the command. Matching lines show each distinct command once (first occurrence). The UI reports how many lines match out of the total (for example `12/340 matches`).

### Library Usage

```typescript
// For Node.js (full functionality)
import { readZHistory } from 'zhistory-ui/fs'
import { parseZHistory, formatTime, type ZHistoryLine } from 'zhistory-ui'

// Read and parse your Z shell history
const historyText = readZHistory()
const historyLines: ZHistoryLine[] = Array.from(parseZHistory(historyText))

// Each line contains timestamp, elapsed time, and command
for (let line of historyLines) {
  console.log(
    formatTime(line.startTime),
    line.elapsedSeconds + 's',
    line.command,
  )
}
```

```typescript
// For browsers (core functionality only)
import { parseZHistory, formatTime, type ZHistoryLine } from 'zhistory-ui'

// Parse history text (from any source)
const historyLines: ZHistoryLine[] = Array.from(parseZHistory(historyText))
```

**Import Options:**

- **Main import** (`'zhistory-ui'`): Core parsing functions (browser-compatible)
- **Filesystem import** (`'zhistory-ui/fs'`): File system access functions (Node.js only)

## API Reference

### Functions

#### `readZHistory(): string`

Reads the Z shell history file from `~/.zhistory`.

#### `parseZHistory(text: string): Generator<ZHistoryLine>`

Parses the history text and yields individual history lines.

#### `formatTime(date: Date): string`

Formats a Date object as `YYYY-MM-DD HH:MM:SS`.

### Types

#### `ZHistoryLine`

```typescript
type ZHistoryLine = {
  startTime: Date // When the command started
  elapsedSeconds: number // How long it took to execute
  command: string // The command that was run
}
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
