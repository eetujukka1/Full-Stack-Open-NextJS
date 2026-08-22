import { defineConfig } from "@playwright/test"

const port = 3000
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  use: {
    baseURL,
  },
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: baseURL,
    timeout: 120 * 1000,
  },
})
