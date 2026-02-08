/**
 * Database Seeding Script
 * Creates initial admin user and system configuration
 */

import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // ============================================
  // CREATE ADMIN USER
  // ============================================
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ideaflow.ai';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'المسؤول الرئيسي',  // "Main Admin" in Arabic
        password: hashedPassword,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
      },
    });

    console.log('✅ Admin user created:', {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });
  } else {
    console.log('ℹ️  Admin user already exists');
  }

  // ============================================
  // CREATE DEMO USER
  // ============================================
  const demoEmail = 'demo@ideaflow.ai';
  const demoPassword = 'demo123456';

  const existingDemo = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (!existingDemo) {
    const hashedPassword = await bcrypt.hash(demoPassword, 10);

    const demo = await prisma.user.create({
      data: {
        email: demoEmail,
        name: 'مستخدم تجريبي',  // "Demo User" in Arabic
        password: hashedPassword,
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
      },
    });

    console.log('✅ Demo user created:', {
      id: demo.id,
      email: demo.email,
      role: demo.role,
    });
  } else {
    console.log('ℹ️  Demo user already exists');
  }

  // ============================================
  // SYSTEM CONFIGURATION
  // ============================================
  const configs = [
    {
      key: 'ai_rate_limit_per_user',
      value: '50',
      description: 'Maximum AI requests per user per day',
    },
    {
      key: 'max_projects_per_user',
      value: '100',
      description: 'Maximum projects a user can create',
    },
    {
      key: 'maintenance_mode',
      value: 'false',
      description: 'Enable/disable maintenance mode',
    },
  ];

  for (const config of configs) {
    const existing = await prisma.systemConfig.findUnique({
      where: { key: config.key },
    });

    if (!existing) {
      await prisma.systemConfig.create({
        data: config,
      });
      console.log(`✅ System config created: ${config.key}`);
    }
  }

  console.log('🎉 Database seeding completed!');
  console.log('\n📝 Default Credentials:');
  console.log(`   Admin: ${adminEmail} / ${adminPassword}`);
  console.log(`   Demo:  ${demoEmail} / ${demoPassword}`);
  console.log('\n⚠️  Change these passwords immediately in production!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
