import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnBuckets = nextUrl.pathname.startsWith('/buckets');
      if (isOnBuckets) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthorized users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/buckets', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;