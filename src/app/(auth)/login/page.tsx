"use client"

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { signIn } from 'next-auth/react';


const OtpForm = () => {
    const [mobile, setMobile] = useState<string>("")
    const [token, setToken] = useState<string>("")
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setIsPending(true)

        signIn('credentials', {
            redirect: false,
            mobile,
            token,
        })
            .then((data: any) => {
                if (data.status === 200) {
                    window.location.href = window.location.origin

                } else {
                    const error = JSON.parse(data.error);
                    console.log("error", error)
                }
            })
            .catch((err) => {
                console.log('err', err);
            })
            .finally(() => {
                setIsPending(false);
            });
    };




    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[300px] m-auto'>

            <input type='text' value={mobile} className='text-gray-900' onChange={(e => setMobile(e.target.value))} placeholder='mobile' />
            <input type='text' value={token} className='text-gray-900' onChange={(e => setToken(e.target.value))} placeholder='token' />

            <button>{isPending ? "...loading" : "login"}</button>
        </form>
    );
};

export default OtpForm;
