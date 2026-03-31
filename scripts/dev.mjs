import { createServer } from 'net'
import { spawn } from 'child_process'

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = createServer()
    server.once('error', () => resolve(false))
    server.once('listening', () => server.close(() => resolve(true)))
    server.listen(port)
  })
}

async function findFreePort(start = 3000) {
  for (let port = start; port < start + 20; port++) {
    if (await isPortFree(port)) return port
  }
  throw new Error('No free port found between 3000 and 3019')
}

const port = await findFreePort(3000)
console.log(`Starting Next.js on http://localhost:${port}`)

spawn('npx', ['next', 'dev', '--port', String(port)], {
  stdio: 'inherit',
  shell: true,
})
