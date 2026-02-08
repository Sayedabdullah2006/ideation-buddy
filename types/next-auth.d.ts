/**
 * NextAuth Type Extensions
 * Extends default NextAuth types with custom user properties
 */

import { UserRole, UserStatus } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Extended User type
   */
  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
    status: UserStatus;
    avatar: string | null;
  }

  /**
   * Extended Session type
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: UserRole;
      status: UserStatus;
      avatar: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extended JWT type
   */
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
    status: UserStatus;
    avatar: string | null;
  }
}
