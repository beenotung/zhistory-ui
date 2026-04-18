import { formatTime, parseZHistory } from './core'
import { readZHistory } from './fs'

let patterns = process.argv.slice(2)

let text = readZHistory()
let seq = parseZHistory(text)
if (patterns.length === 0) {
  for (let line of seq) {
    console.log(formatTime(line.startTime), line.elapsedSeconds, line.command)
  }
} else {
  let seen_commands = new Set<string>()
  let self_pattern = patterns.map(pattern => ' ' + pattern).join('')
  for (let line of seq) {
    let matched = patterns.every(pattern => line.command.includes(pattern))
    if (!matched) continue
    if (line.command.endsWith(self_pattern)) continue
    if (seen_commands.has(line.command)) continue
    seen_commands.add(line.command)
    console.log(formatTime(line.startTime), line.elapsedSeconds, line.command)
  }
}
