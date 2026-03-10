# zhistory-ui

A TypeScript library and CLI tool for parsing and displaying Z shell history files.

[![npm Package Version](https://img.shields.io/npm/v/zhistory-ui)](https://www.npmjs.com/package/zhistory-ui)

## Features

- Parse Z shell history files (`~/.zhistory`)
- Display command history with timestamps and execution time
- CLI tool for terminal output
- Web UI tool for browser visualization
- TypeScript support with full type definitions
- Isomorphic package: works in Node.js and browsers

## Installation

```bash
npm install -g zhistory-ui
```

Or use with npx without installing:

```bash
npx zhistory-cli
npx zhistory-webui
```

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

### Web UI Tool

View your Z shell history in a browser:

```bash
zhistory-webui
```

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
