import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { config } from './src/config/index.js'
import { globalErrorHandler } from './src/middleware/errorHandler.js'
import { init as initDb } from './src/db/index.js'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

import authRoutes from './src/routes/auth.js'
import studentsRoutes from './src/routes/students.js'
import projectsRoutes from './src/routes/projects.js'
import exploreRoutes from './src/routes/explore.js'
import * as exploreCtrl from './src/controllers/exploreController.js'
import universitiesRoutes from './src/routes/universities.js'
import adminRoutes from './src/routes/admin.js'
import statsRoutes from './src/routes/stats.js'
import { isEmailConfigured, verifyEmailTransport } from './src/utils/email.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(helmet())
app.use(cors({ origin: config.frontendOrigin, credentials: true }))
app.use(express.json())
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))


const authLimiter = rateLimit(config.rateLimitAuth)
app.use('/api/auth/login', authLimiter)
app.use('/api/auth/register', authLimiter)
app.use("/api/stats", statsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/students', studentsRoutes)
app.use('/api/projects', projectsRoutes)
app.get('/api/explore', exploreCtrl.getStudents)
app.use('/api/explore', exploreRoutes)
app.use('/api/universities', universitiesRoutes)
app.use('/api/admin', adminRoutes)

app.get('/api', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'SkillsBridge API',
      baseUrl: '/api',
      endpoints: {
        auth: '/api/auth (POST /register, POST /login, GET /me)',
        students: '/api/students (GET /me, PUT /me, GET /:id)',
        projects: '/api/projects',
        explore: '/api/explore or /api/explore/students',
        universities: '/api/universities',
        admin: '/api/admin (admin-only)',
        stats: '/api/stats',
      },
    },
  })
})
app.get('/api/health', (req, res) => res.json({ success: true, data: { status: 'ok' } }))

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found. Use /api for endpoint list.' })
})
app.use(globalErrorHandler)

export { app }

import express from "express"

const app = express()

await initDb()

console.log(`Email configured: ${isEmailConfigured() ? 'yes' : 'no'}`)

verifyEmailTransport()
  .then(() => console.log('Email transport: verified'))
  .catch((e) => console.error('Email transport: failed to verify:', e?.message || e))

export default app

const entryPath = process.argv[1] ? resolve(process.argv[1]) : ''
const isRunDirect = entryPath && fileURLToPath(import.meta.url) === entryPath
if (isRunDirect) {
  start().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
