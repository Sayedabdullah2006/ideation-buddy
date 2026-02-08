/**
 * NextAuth Configuration
 * JWT-based authentication with Credentials provider
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import * as bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { UserRole, UserStatus } from '@prisma/client';
import { AuthUser } from '@/types';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  // Use JWT strategy
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Authentication pages
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },

  // Providers
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('البريد الإلكتروني وكلمة المرور مطلوبان');
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }

        // Check if account is active
        if (user.status !== UserStatus.ACTIVE) {
          throw new Error('هذا الحساب غير نشط. يرجى الاتصال بالمسؤول');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        // Return user without password
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          avatar: user.avatar,
        };
      },
    }),
  ],

  // Callbacks
  callbacks: {
    // JWT callback - runs when JWT is created or updated
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.status = user.status;
        token.avatar = user.avatar;
      }

      // Update session
      if (trigger === 'update' && session) {
        token.name = session.name;
        token.avatar = session.avatar;
      }

      return token;
    },

    // Session callback - runs when session is checked
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as UserRole;
        session.user.status = token.status as UserStatus;
        session.user.avatar = token.avatar as string | null;
      }

      return session;
    },
  },

  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
};
