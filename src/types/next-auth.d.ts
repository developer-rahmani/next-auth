import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string;
        refreshToken: string;

        isLogged: boolean;
        expiration: number;
        user: {
            /** The user's postal address. */
            id: string;

            firstName?: string;
            lastName?: string;
            subject: string[];
            mobile: string;
            isConfirmed: boolean;
            address: any[];
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string;
        refreshToken: string;
        isLogged: boolean;

        expiration: number;
        user: {
            /** The user's postal address. */
            id: string;

            firstName?: string;
            lastName?: string;

            mobile: string;
            isConfirmed: boolean;
            subject: string[];
            address: any[];
        };
    }
}
