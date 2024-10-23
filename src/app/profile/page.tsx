import UserInfo from '@/components/UserInfo';
import { getServerAuthSession } from '@/server/auth';
import React from 'react'

const page = async() => {
    const authSession = await getServerAuthSession();

    if (!authSession?.user) {
        return null; 
    }
    
  return (
    <div className="flex justify-center items-center p-4 m-5">
        <UserInfo user={authSession?.user} />
    </div>
  )
}

export default page
