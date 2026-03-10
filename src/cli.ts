import { formatTime, parseZHistory, readZHistory } from './core'

let text = readZHistory()
let seq = parseZHistory(text)
for (let line of seq) {
  console.log(formatTime(line.startTime), line.elapsedSeconds, line.command)
}
