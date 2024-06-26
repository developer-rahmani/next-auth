import { api } from "@/api";
import { getSession } from "next-auth/react";

export const authVerify = async ({ mobile, token }: { mobile: string, token: string }) => {
    return api
        .post<{
            accessToken: string;
            refreshToken: string;
            expiration: number;
        }>(
            'end-point',
            {
                mobile,
                token,
            },
            {
                withCredentials: true,
            },
        )
        .then(({ data }) => data);
};

export const authRefreshToken = (rt?: string) =>
    api
        .post<{
            accessToken: string;
            refreshToken: string;
            expiration: number;
        }>('end-point', { refresh: rt }, { withCredentials: true })
        .then(({ data }) => data);


export const logout = async () => {
    const token = await getSession();
    return api
        .post('end-point', {
            refresh: token?.refreshToken,
        })
        .then(({ data }) => data);
};
