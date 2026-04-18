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
	.search-bar {
		position: fixed;
		margin: 1rem;
		top: 0;
		right: 0;
	}
	.container {
		border-collapse: collapse;
		max-width: 100%;
		overflow-x: auto;
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
<div class="search-bar">
	<input id="searchInput" placeholder="Search..." oninput="search()" />
	<div id="searchResult"></div>
</div>
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
</div>
<script>
function search() {
  let patterns = searchInput.value
    .split(' ')
    .map(pattern => pattern.trim())
    .filter(pattern => pattern.length > 0)
  let lines = document.querySelectorAll('.container .line')
  if (patterns.length === 0) {
    for (let line of lines) {
      line.hidden = false
    }
    searchResult.hidden = true
  } else {
    let seen_commands = new Set()
    function filter(line) {
      let command = line.querySelector('.command').innerText.trim()
      let matched = patterns.every(pattern => command.includes(pattern))
      if (!matched) return false
      if (seen_commands.has(command)) return false
      seen_commands.add(command)
      return true
    }
    for (let line of lines) {
      line.hidden = !filter(line)
    }
    let m = seen_commands.size.toLocaleString()
    let n = lines.length.toLocaleString()
    searchResult.innerText = m + '/' + n + ' matches'
    searchResult.hidden = false
  }
}
search()
</script>
</body>
</html>`)

stream.end()

open(file)
