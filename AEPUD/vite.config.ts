import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import { spawn } from 'node:child_process'
import { generateKeyPairSync } from 'node:crypto'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

function apiLocale(): Plugin {
  let arreter: (() => void) | undefined

  return {
    name: 'aepud-api-locale',
    async config(_config, { command, isPreview }) {
      if (command !== 'serve') return

      const cwd = fileURLToPath(new URL('./api/', import.meta.url))
      if (!existsSync(join(cwd, 'vendor', 'autoload.php'))) {
        throw new Error('Installe les dépendances PHP avec composer --working-dir=api install.')
      }

      const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        publicKeyEncoding: { type: 'spki', format: 'pem' },
      })
      const cache = mkdtempSync(join(tmpdir(), 'aepud-api-'))
      const php = spawn('php', ['-S', '127.0.0.1:0', '-t', 'public', 'public/index.php'], {
        cwd,
        env: {
          ...process.env,
          AEPUD_CACHE_DIR: cache,
          AEPUD_JWT_PRIVATE_KEY: privateKey,
          AEPUD_JWT_PUBLIC_KEY: publicKey,
        },
        stdio: ['ignore', 'ignore', 'pipe'],
        windowsHide: true,
      })
      arreter = () => { php.kill() }
      php.once('close', () => rmSync(cache, { recursive: true, force: true }))

      const cible = await new Promise<string>((resolve, reject) => {
        const attente = setTimeout(() => {
          php.kill()
          reject(new Error('Le serveur PHP n’a pas démarré.'))
        }, 5000)
        php.once('error', error => {
          clearTimeout(attente)
          reject(new Error('Impossible de lancer PHP. Vérifie que la commande php est disponible.', { cause: error }))
        })
        php.once('exit', () => {
          clearTimeout(attente)
          reject(new Error('Le serveur PHP s’est arrêté avant de démarrer.'))
        })
        php.stderr.setEncoding('utf8')
        php.stderr.on('data', (message: string) => {
          const adresse = message.match(/Development Server \((http:\/\/127\.0\.0\.1:\d+)\) started/)
          if (adresse) {
            clearTimeout(attente)
            resolve(adresse[1])
          }
          if (message.includes('PHP Fatal error') || message.includes('[critical]')) {
            process.stderr.write(message)
          }
        })
      })

      const proxy = { '/api': cible }
      return isPreview ? { preview: { proxy } } : { server: { proxy } }
    },
    configureServer(server) {
      server.httpServer?.once('close', () => arreter?.())
    },
    configurePreviewServer(server) {
      server.httpServer.once('close', () => arreter?.())
    },
    closeBundle() {
      arreter?.()
    },
  }
}

export default defineConfig({
  plugins: [
    apiLocale(),
    react(),
    tailwindcss()
  ],
})
