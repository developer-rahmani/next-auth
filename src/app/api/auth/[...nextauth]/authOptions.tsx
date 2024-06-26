import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authRefreshToken, authVerify } from '@/api/login';

async function refreshToken(token: JWT) {
    const credentials = await authRefreshToken(token.refreshToken);

    return { ...token, ...credentials };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                mobile: {},
                token: {},
            },
            async authorize(credentials: any): Promise<any> {
                const { mobile, token } = credentials;

                try {
                    const data = await authVerify({ mobile, token });
                    return data;
                } catch (error: any) {
                    throw new Error(JSON.stringify(error.response.data));
                }
            },
        }),
    ],
    callbacks: {
        jwt({ user, token }) {
            if (user) return { ...token, ...user };

            if (Date.now() > token.expiration + Date.now()) {
                return token;
            }

            return refreshToken(token);
        },
        session({ session, token }) {
            session.user = {
                ...token.user,
                id: token.user.id,
            };
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.isLogged = !!token.accessToken;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_URL,
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/user-login',
    },
};

export const getServerAuthSession = () => getServerSession(authOptions);

export default authOptions;
