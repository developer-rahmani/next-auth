"use client"

import { logout } from '@/api/login'
import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = () => {
    const onLogout = async () => {
        const data = await logout()
        console.log("data", data)
        if(data){
            signOut({ redirect: true, callbackUrl: "/" })
        }
    }


    return (
        <button onClick={onLogout}>logout</button>
    )
}

export default LogoutButton