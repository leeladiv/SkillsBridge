import bcrypt from 'bcrypt'
import * as db from './index.js'

const config = { bcryptRounds: 10 }

async function seed() {
  await db.init()

  const universities = [
    (await db.getUniversityByName('African Methodist Episcopal University')) || (await db.createUniversity(db.uuid(), 'African Methodist Episcopal University', 1)),
    (await db.getUniversityByName('Starz University')) || (await db.createUniversity(db.uuid(), 'Starz University', 1)),
    (await db.getUniversityByName('Bluecrest University College')) || (await db.createUniversity(db.uuid(), 'Bluecrest University College', 1)),
  ]
  const ame = universities.find((u) => u.name === 'African Methodist Episcopal University') || universities[0]

  const hash = await bcrypt.hash('password123', config.bcryptRounds)

  if (!(await db.getUserByEmail('admin@skillsbridge.dev'))) {
    await db.createUser({
      fullName: 'Admin',
      email: 'admin@skillsbridge.dev',
      password: hash,
      role: 'admin',
      universityId: ame.id,
    })
    console.log('Created admin@skillsbridge.dev (password: password123)')
  }

  if (!(await db.getUserByEmail('student@test.com'))) {
    await db.createUser({
      fullName: 'Test Student',
      email: 'student@test.com',
      password: hash,
      role: 'student',
      universityId: ame.id,
      isPublic: true,
    })
    console.log('Created student@test.com (password: password123)')
  }

  console.log('Seed done')
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
