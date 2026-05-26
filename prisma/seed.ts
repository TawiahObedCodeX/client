import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'
import { hashPassword } from '../lib/password'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed...')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  console.log('🧹 Cleaning existing data...')
  await prisma.auditLog.deleteMany()
  await prisma.session.deleteMany()
  await prisma.application.deleteMany()
  await prisma.passwordResetToken.deleteMany()
  await prisma.user.deleteMany()
  console.log('✅ Data cleaned')

  console.log('\n📝 Creating users...')

  const demoPassword = await hashPassword('password123')
  
  const applicant = await prisma.user.create({
    data: {
      fullName: 'Tawiah O.',
      companyName: 'FDA Demo Company Ltd',
      email: 'demo@fda.gov.gh',
      password: demoPassword,
      role: 'APPLICANT',
      emailVerified: true,
      isActive: true,
    },
  })
  console.log(`✅ Applicant created: ${applicant.email}`)

  const reviewer = await prisma.user.create({
    data: {
      fullName: 'Abena Mensah',
      companyName: 'FDA Ghana',
      email: 'reviewer@fda.gov.gh',
      password: demoPassword,
      role: 'REVIEWER',
      emailVerified: true,
      isActive: true,
    },
  })
  console.log(`✅ Reviewer created: ${reviewer.email}`)

  const admin = await prisma.user.create({
    data: {
      fullName: 'Kwame Asante',
      companyName: 'FDA Ghana',
      email: 'admin@fda.gov.gh',
      password: demoPassword,
      role: 'ADMIN',
      emailVerified: true,
      isActive: true,
    },
  })
  console.log(`✅ Admin created: ${admin.email}`)

  const inactiveUser = await prisma.user.create({
    data: {
      fullName: 'Inactive User',
      companyName: 'Inactive Corp',
      email: 'inactive@example.com',
      password: demoPassword,
      role: 'APPLICANT',
      emailVerified: false,
      isActive: false,
    },
  })
  console.log(`⚠️  Inactive user created: ${inactiveUser.email}`)

  console.log('\n📋 Creating applications...')

  const applications = [
    {
      applicationId: 'FDA-2026-001',
      productName: 'Paracetamol Tablets 500mg',
      category: 'PHARMACEUTICALS' as const,
      status: 'UNDER_REVIEW' as const,
      submittedDate: new Date('2026-03-15'),
      userId: applicant.id,
    },
    {
      applicationId: 'FDA-2026-002',
      productName: 'Shea Butter Moisturizing Cream',
      category: 'COSMETICS' as const,
      status: 'APPROVED' as const,
      submittedDate: new Date('2026-02-28'),
      userId: applicant.id,
    },
    {
      applicationId: 'FDA-2026-003',
      productName: 'Fortified Breakfast Cereal',
      category: 'FOOD_PRODUCTS' as const,
      status: 'PENDING_PAYMENT' as const,
      submittedDate: new Date('2026-03-10'),
      userId: applicant.id,
    },
    {
      applicationId: 'FDA-2026-004',
      productName: 'Digital Thermometer',
      category: 'MEDICAL_DEVICES' as const,
      status: 'DRAFT' as const,
      userId: applicant.id,
    },
    {
      applicationId: 'FDA-2026-005',
      productName: 'Herbal Immune Booster',
      category: 'HERBAL_PRODUCTS' as const,
      status: 'SUBMITTED' as const,
      submittedDate: new Date('2026-04-01'),
      userId: applicant.id,
    },
  ]

  for (const app of applications) {
    await prisma.application.create({ data: app })
    console.log(`✅ Application created: ${app.applicationId} - ${app.productName}`)
  }

  console.log('\n📊 Creating audit logs...')

  await prisma.auditLog.create({
    data: {
      userId: applicant.id,
      action: 'USER_REGISTERED',
      entity: 'User',
      entityId: applicant.id,
      details: {
        email: applicant.email,
        role: 'APPLICANT',
      },
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: applicant.id,
      action: 'LOGIN_SUCCESS',
      entity: 'User',
      entityId: applicant.id,
      details: {
        browser: 'Chrome 120',
        os: 'Windows 11',
      },
    },
  })

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ SEED COMPLETED SUCCESSFULLY')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('\n📧 DEMO LOGIN CREDENTIALS:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Applicant:  demo@fda.gov.gh / password123')
  console.log('Reviewer:   reviewer@fda.gov.gh / password123')
  console.log('Admin:      admin@fda.gov.gh / password123')
  console.log('\n🔒 IMPORTANT: Change these passwords in production!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
