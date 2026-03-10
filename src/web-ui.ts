import { join } from 'path'
import { formatTime, parseZHistory } from './core'
import { readZHistory } from './fs'
import { tmpdir } from 'os'
import { createWriteStream } from 'fs'
import open from 'open'

let text = readZHistory()
let seq = parseZHistory(text)

let file = join(tmpdir(), 'zhistory-webui.html')
let stream = createWriteStream(file)

stream.write(/* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ZHistory</title>
<style>
	body {
	}
	.container {
		border-collapse: collapse;
		max-width: 100%;
		overflow-x: auto;
	}
	.line {
	}
	.time {
		background-color: bisque;
		padding: 4px;
	}
	.elapsed {
		background-color: lightgreen;
		padding: 4px;
	}
	.command {
		white-space: pre-wrap;
		margin: 1rem;
		margin-top: 0.5rem;
	}
</style>
</head>
<body>
<h1>ZHistory</h1>
<div class="container">
    `)
for (let line of seq) {
  stream.write(/* html */ `<div class="line">
	<span class="time">${formatTime(line.startTime)}</span>
	<span class="elapsed">${line.elapsedSeconds}</span>
	<blockquote class="command">${line.command}</blockquote>
</div>`)
}

stream.write(/* html */ `
		</tbody>
	</table>
</div>
</body>
</html>`)

stream.end()

open(file)
