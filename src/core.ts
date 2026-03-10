export function* parseZHistory(text: string): Generator<ZHistoryLine> {
  let lines = text.split('\n')

  let lastLine = ''
  for (let line of lines) {
    if (line.startsWith(': ')) {
      // new line
      if (lastLine) {
        yield parseLine(lastLine)
      }
      lastLine = line
    } else {
      // continue last line
      lastLine += '\n' + line
    }
  }
  if (lastLine) {
    yield parseLine(lastLine)
  }
}

export type ZHistoryLine = {
  startTime: Date
  elapsedSeconds: number
  command: string
}

export function parseLine(line: string): ZHistoryLine {
  // format: ": <start-timestamp>:<elapsed-seconds>;<command>"
  // e.g. ": 1773161555:0;cat .zhistory"
  let parts = line.split(';')
  let prefix = parts[0]
  let command = line.slice(prefix.length + 1).trim()
  parts = prefix.split(':')
  let startTimestamp = +parts[1]
  let elapsedSeconds = +parts[2]
  let startTime = new Date(startTimestamp * 1000)
  return { startTime, elapsedSeconds, command }
}

export function formatTime(date: Date) {
  let y = date.getFullYear()
  let m = (date.getMonth() + 1).toString().padStart(2, '0')
  let d = date.getDate().toString().padStart(2, '0')
  let H = date.getHours().toString().padStart(2, '0')
  let M = date.getMinutes().toString().padStart(2, '0')
  let S = date.getSeconds().toString().padStart(2, '0')
  return `${y}-${m}-${d} ${H}:${M}:${S}`
}
