import { readFileSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'

export function readZHistory() {
  let file = join(homedir(), '.zhistory')
  let text = readFileSync(file, 'utf-8')
  return text
}
