"use client";

import { UserInfoProps } from "@/types/user";
import { signOut } from "next-auth/react";
import Image from "next/image";
import UserLogo from "@/images/user.jpg"



export default function UserInfo({ user }: UserInfoProps) {
  const handleLogout = async () => {
    await signOut();
  }

  return(
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <Image src={UserLogo} className="w-24 h-24 rounded-full bg-black" alt="profile"/>
        </div>
        <div className="text-center mt-3">
          <span className="inline-block bg-gray-600 text-white text-xs px-2 py-1 rounded">
            Pro
          </span>
          <h5 className="mt-2 text-lg font-semibold">{user.name}</h5>
          <span className="text-sm text-gray-500">Id: {user.id}</span>

          <p className="mt-4 text-sm text-gray-600">
            Email: {user.email}
          </p>

          <div className="mt-5 space-x-4">
            <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-600 hover:text-white" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}