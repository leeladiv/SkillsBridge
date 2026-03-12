import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync, existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const uploadRoot = join(__dirname, '..', '..', 'uploads')
const projectDir = join(uploadRoot, 'projects')

if (!existsSync(uploadRoot)) mkdirSync(uploadRoot, { recursive: true })
if (!existsSync(projectDir)) mkdirSync(projectDir, { recursive: true })

const ALLOWED_MIMES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
]
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf']

function fileFilter(req, file, cb) {
  const mimeOk = ALLOWED_MIMES.includes(file.mimetype)
  const ext = file.originalname && file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'))
  const extOk = ext && ALLOWED_EXTENSIONS.includes(ext)
  if (mimeOk && extOk) {
    cb(null, true)
  } else {
    const err = new Error('Invalid file type. Allowed: images (JPEG, PNG, GIF, WebP) and PDF.')
    err.statusCode = 400
    cb(err, false)
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, projectDir)
  },
  filename: (req, file, cb) => {
    const projectId = req.params.id || req.params.projectId || 'project'
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${projectId}-${unique}-${safeName}`)
  },
})

export const projectUpload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter,
})

